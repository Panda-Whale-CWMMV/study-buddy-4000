const { Pool } = require("pg");
const db = require("../models/model.js");

const usersController = {};

//create
usersController.createUser = (req, res, next) => {
  const params = [req.body.first_name, req.body.last_name, req.body.user_name, req.body.user_password, req.body.user_email, req.body.user_location];
  const queryText =
    "INSERT INTO public.users IF NOT EXISTS (first_name, last_name, user_name, user_password, user_email, user_location) VALUES ($1, $2, $3, $4, $5, $6);";

  db.query(queryText, params)
    .then((res) => next())
    .catch((err) => next(err));
};



//read
usersController.getUser = (req, res, next) => {
  const params = [req.params.user_id];
  const queryText = "SELECT * FROM public.users WHERE user_id = $1;";

  db.query(queryText, params)
    .then((result) => {
      res.locals.user = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

usersController.getAllUsers = (req, res, next) => {
  const queryText = "SELECT * FROM public.users LIMIT 100;";

  //promise based syntax
  db.query(queryText)
    .then((result) => {
      res.locals.users = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

//authenticate name/password combo
usersController.userAuth = (req, res, next) => {
  const params = [req.params.user_name, req.params.user_password]
  const queryText = "SELECT * FROM public.users WHERE user_name = $1 AND user_password = $2;";
  db.query(queryText, params)
  .then(result => {
    res.locals.user = result.rows
    return next();
  })
  .catch((err) => next(err));

}

//update
usersController.updateUserName = (req, res, next) => {
  console.log(req)
  const params = [
    req.params.user_id,
    req.body.user_name, 
    req.body.first_name,
    req.body.user_location,
    req.body.user_email,
    // req.params.bio, -- WOULD HAVE TO UPDATE DATABASE
  ];
  console.log("params", params);
  const queryText =
    `UPDATE public.users 
      SET user_name = $2,
      first_name = $3,
      user_location = $4,
      user_email = $5
      WHERE user_id = $1;`;
  db.query(queryText, params)
    .then((result) => {
      res.locals.users = result.rows;
      return next();
    })
    .catch((err) => next(err));
};

//delete
usersController.deleteUser = async (req, res, next) => {
  const params = [req.params.user_id];
  const queryText = "DELETE FROM public.users WHERE user_id = $1;";
  db.query(queryText, params)
    .then((result) => {
      return next();
    })
    .catch((err) => next(err));
};

module.exports = usersController;
