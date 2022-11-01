// // creating express server

// const express = require("express");
// const app = express();
// const mysql = require("mysql");

// const db = mysql.createConnection({
//   user: "root",
//   password: "root",
//   database: "todo_list",
//   host: "localhost",
//   port: 3306,
// });

// // enable error logging for each connection query
// db.on("error", function (err) {
//   console.log(err.code); // example : 'ER_BAD_DB_ERROR'
// });

// exports.connection = function () {
//   return db;
// };

// // db.connect((err) => {
// //     if (err) throw err;
// //     console.log('Connected to MySQL Server!');
// //   });

// db.connect(function (err) {
//   if (err) throw err;
//   // var sql = "INSERT INTO todo_table (toDoName, CurrentStatus, date) VALUES ('eat dinner' , 0, 12345)";
//   // db.query(sql, function (err, result) {
//   //   if (err) throw err;
//   //   console.log("1 record inserted, ID: " + result.insertId);
//   // });
// });

// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO todo_table (toDoName, CurrentStatus, date) VALUES ('eat dinner2' , 0, 7890)";
//   db.query(sqlInsert, (err, result) => {
//     res.send("This is backend app - info inserted" + result);
//   });
// });

// // app.get("/",(req,res) => {
// //     db.query('INSERT INTO todo_table (toDoName) VALUES ('eat dinner')', (err, rows) => {
// //         if(err) throw err;
// //         console.log('The data from users table are: \n', rows);
// //         db.end();
// //     });
// // });

// app.listen(3005, () => {
//   console.log("running on port 3005");
// });

// creating express server

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
  socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock', //path to mysql sock in MAMP
  user: "root",
  password: "root",
  database: "todo_list",
  host: "localhost",
  port: 3306,
});

app.use(cors);
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


db.on("error", function (err) {
    console.log(err.code); 
  });
  
exports.connection = function () {
  return db;
};

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
  });

app.get("/api/get", (req, res) => {
  const sqlGet =
    "SELECT * FROM todo_table";
  db.query(sqlGet, (err, result) => {
    console.log(result)
  });
});

app.post("/api/insert", (req, res) => {
  console.log(req);
  const todoName = req.body.toDoNameFE;
  const CurrentStatus = req.body.CurrentStatusFE;

  const sqlInsert =
    "INSERT INTO todo_table (toDoName, CurrentStatus) VALUES (?,?)";
  db.query(sqlInsert, [toDoName, CurrentStatus], (err, result) => {
    console.log(result, err);
  });
});

app.listen(3005, () => {
  console.log("running on port 3005");
});