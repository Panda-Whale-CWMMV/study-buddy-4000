const passport = require('passport');
const  GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
// the user would come back in req.user for the entire user

passport.use(new GoogleStrategy({
    clientID: "308951818674-fcgi7e1uivq1omu83hp8e81egdc5m016.apps.googleusercontent.com",
    clientSecret: "S4BlJ2zdREbzL7DrH8v0bKZy",
    callbackURL: "http://localhost:8080/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //use the profile info (mainly profile.id) to check if user is registered in the db

    //this is where we search our own db (may need to import our db)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    // });
  }
));