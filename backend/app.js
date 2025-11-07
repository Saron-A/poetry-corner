const bcrypt = require("bcryptjs");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

app.use(cors());
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

// authentication
//Step 1: initialize passport
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // a month
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Step 2: define a strategy
// when logging in
passport.use(
  new localStrategy(async (username, password, done) => {
    // fetch user information from the database using the username and check for password
  })
);

//Step 3: serialize and deserialize user
//3.1 serialize
passport.serializeUser((user, done) => {
  return done(null, user.id);
});
//3.2 deserialize
passport.deserializeUser(async (id, done) => {
  // fetch the user from the database using the id
  //return the user object
});
//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes -- mandatory
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", async (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  // hash it and add it to the database, make sure the password === confirm_pass
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate({
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

//check if the server is listening
app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server running at port 3000");
});
