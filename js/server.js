//Create a server and API routes for the poems using express

//Import the express library, cors and db.js
const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
app.use(cors());

//getting all poems from the database
app.get("/poems", (req, res) => {
  db.query("Select * from poems", (err, result) => {
    if (err) {
      console.error(err);
    }
    res.json(result);
  });
});

//getting a poem by title from the database
app.get("/poems/:title", (req, res) => {
  const reqTitle = req.params.title;
  db.query("Select * from poems where title = ?", [reqTitle], (err, result) => {
    if (err) {
      console.error(err);
    }
    res.json(result[0]);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
