const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  user: "root",
  password: "root",
  database: "todo_list",
  host: "localhost",
  port: 3306,
  Socket: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM todo_table";
  db.query(sqlGet, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  console.log("id=>", req.params.id);
  const toDoId = req.params.id;
  //DELETE FROM `todo_table` WHERE `todo_table`.`id` = 28
  const sqlDelete = "DELETE FROM `todo_table` WHERE `todo_table`.`id` = ?";
  db.query(sqlDelete, [toDoId], (err, result) => {
    if (result) {
      console.log(result, err);
      res.status(200).send(result);
    } else {
      res.status(500).send(err);
    }
  });
});

app.put("/api/updateStatus/:id", (req, res) => {
  console.log("this is update")
  const status =  req.body.CurrentStatus;
  const id = req.params.id

  console.log("status=>", status);

  const updateTodo = "UPDATE `todo_table` SET `CurrentStatus` = ? WHERE `todo_table`.`id` = ?;"
  db.query(updateTodo, [status, id], (err, result) => {
    console.log(err,result)
    res.status(200).send(result)
  })
  
})


app.post("/api/insert", (req, res) => {
  console.log("this is insert", req.body);
  const toDoName = req.body.toDoName;
  const CurrentStatus = req.body.CurrentStatus;
  const sqlInsert =
    "INSERT INTO todo_table (toDoName, CurrentStatus) VALUES (?,?)";
  db.query(sqlInsert, [toDoName, CurrentStatus], (err, result) => {
    console.log(result, err);
    res.status(200).send(result);
  });
  
});

app.listen(3005, () => {
  console.log("running on port 3005");
});
