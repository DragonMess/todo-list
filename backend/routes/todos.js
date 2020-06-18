const express = require("express");
const router = express.Router();
const db = require("../db.js");

/* GET home page. */
router.get("/", (req, res) => {
  db.query(`SELECT * FROM tasks`)
    .then((todosObj) => res.json(todosObj.rows))
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  // get id from params
  let userValues = [req.params.id];

  //
  let queryString = `SELECT * FROM tasks WHERE id = $1;`;
  db.query(queryString, userValues)
    .then((todosObj) => res.json(todosObj.rows))
    .catch((err) => console.log(err));
});

router.post("/task", (req, res) => {
  // get obj with req.body
  const userObj = req.body;
  // Asign array of values to use in queryString
  const userValues = [userObj.task, userObj.completed];

  let queryString = `INSERT INTO tasks (task,completed)
  VALUES ($1::text,$2::boolean) RETURNING *;`;

  db.query(queryString, userValues)
    .then((dbRes) => {
      dbRes.rows[0];
      res.json(dbRes);
    })
    .catch((err) => console.log(err));
});

router.put("/task", (req, res) => {
  const userObj = req.body;
  const userValues = [userObj.id, userObj.task, userObj.completed];
  let queryString = `UPDATE tasks SET task = $2, completed = $3
  WHERE id = $1 RETURNING *;`;
  db.query(queryString, userValues)
    .then((dbRes) => {
      dbRes.rows[0];
      res.json(dbRes);
    })
    .catch((err) => console.log(err));
});

router.delete("/task", (req, res) => {
  const userObj = req.body;
  const userValues = [userObj.id];
  let queryString = `Delete FROM tasks
  WHERE id = $1 RETURNING *;`;
  db.query(queryString, userValues)
    .then((dbRes) => {
      dbRes.rows[0];
      res.json(dbRes);
    })
    .catch((err) => console.log(err));
});

module.exports = router;

// INSERT INTO tasks (task,completed)
//   VALUES ('clean my roo',false) RETURNING *;
