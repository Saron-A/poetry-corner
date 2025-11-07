const bcrypt = require("bcryptjs");
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const pool = require("./db/pool");
const db = require("./db/queries");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
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
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "User not found" });
    }

    return done(null, user);
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
  try {
    const { rows } = await pool.query("SELECT * FROM users Where id = $1", [
      id,
    ]);
    const user = rows[0];
    return done(null, user);
  } catch (err) {
    return done(err);
  }
  //return the user object
});
//ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// routes -- mandatory
app.get("/", async (req, res) => {
  try {
    let posts;
    if (req.isAuthenticated()) {
      posts = await db.getAllPoemsByUserId(req.user.id);
      console.log(posts);

      user = {
        username: req.user.username || "",
        intro: req.user.introduction || "",
        quote_msg: req.user.favorite_quote || "",
        quote_author: req.user.quote_author || "",
        featuredPoems: posts || null,
      };
    } else {
      posts = null;
      user = null;
    }
    res.render("index", { user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/signup", async (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  // hash it and add it to the database, make sure the password === confirm_pass
  try {
    const { username, password, confirm_pass } = req.body;
    if (password !== confirm_pass) {
      res.redirect("/");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (username, password) VALUES($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

const accessPath = path.join(__dirname, "public");
app.use(express.static(accessPath));

//check if the server is listening
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running at port ${PORT}`);
});
