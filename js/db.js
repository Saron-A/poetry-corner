//Import the mysql2 library
const mysql = require("mysql2");

//create a connection to the database
const db = mysql.createConnection({
  host: "Localhost",
  user: "root",
  password: "Saron@123",
  database: "poetrycollection",
});

//check if the connection is successful
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to the database as id " + db.threadId);
  }
});

//export the db or the connection to use in other files
module.exports = db;
