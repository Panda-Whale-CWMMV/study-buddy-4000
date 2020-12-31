const express = require("express");
const app = express();
const path = require("path");
const apiRouter = require("./routes/api.js");
const PORT = 3000;
const passport = require('passport');
const cookieSession = require('cookie-session')
const cors = require('cors');
require('./passport-setup');




// const apiRouter = require("./routes/route.js");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'study-session',
  keys: ['key1', 'key2']
}))

// this was already here
// //parse request body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
}

//passport auth process
app.use(passport.initialize());
//to authenticate
app.use(passport.session());


app.use('/build', express.static(path.join(__dirname, '../build')));


// handle anything for api
app.use("/api", apiRouter);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
//google OAuth
app.get('/failed', (req, res) => res.send('You failed to log in!'));
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome ${req.user.displayName}!`));

app.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  req.redirect('/');
})

//catch all
app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});