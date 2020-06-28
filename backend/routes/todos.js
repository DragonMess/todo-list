const express = require("express");
const router = express.Router();
const db = require("../db.js");
// const { getTodos } = require("../helpers/dbHelpers.js");
// const { getTodos } = dbHelpers;

module.exports = function ({ getTodos, postTodo, deleteTodo, editTodo }) {
  /* GET home page. */
  router.get("/", (req, res) => {
    getTodos()
      .then((resDB) => res.json(resDB))
      .catch((err) => console.log(err));
  });

  router.post("/", (req, res) => {
    // get obj with req.body
    const todoObj = req.body;
    postTodo(todoObj)
      // returning the todo id to the client
      .then((resDB) => {
        res.json(resDB.id);
        // console.log(resDB);
      })
      .catch((err) => console.log(err));
  });

  router.delete("/:id", (req, res) => {
    // get todo id from params
    // should be todoId =
    const idObj = Number(req.params.id);
    deleteTodo(idObj)
      .then((resDB) => res.json(resDB))
      .catch((err) => console.log(err));
  });

  router.put("/:id", (req, res) => {
    console.log(Number(req.params.id));
    const todoObj = req.body;
    // console.log(todoObj);
    editTodo(todoObj)
      .then((resDB) => res.json(resDB))
      .catch((err) => console.log(err));
  });
  return router;
};

// router.get("/:id", (req, res) => {
//   // get todo id from params
//   // should be todoId =
//   let userValues = [req.params.id];

//   //
//   let queryString = `SELECT * FROM tasks WHERE id = $1;`;
//   db.query(queryString, userValues)
//     .then((todosObj) => res.json(todosObj.rows))
//     .catch((err) => console.log(err));
// });

// // url : /todos/:id
// // pad de edit
// router.put("/task/edit", (req, res) => {
//   const userObj = req.body;
// const userValues = [userObj.id, userObj.task, userObj.completed];
// let queryString = `UPDATE tasks SET task = $2, completed = $3
// WHERE id = $1 RETURNING *;`;
// db.query(queryString, userValues)
//     .then((dbRes) => {
//       dbRes.rows[0];
//       res.json(dbRes);
//     })
//     .catch((err) => console.log(err));
// });

// // url: /todos/:id
// router.delete("/task/delete", (req, res) => {
//   const userObj = req.body;
//   const userValues = [userObj.id];
//   console.log(req.body);
//   let queryString = `DELETE FROM tasks
//   WHERE id = $1 RETURNING *;`;
//   db.query(queryString, userValues)
//     .then((dbRes) => {
//       dbRes.rows[0];
//       res.json(dbRes);
//     })
//     .catch((err) => console.log(err));
// });

// module.exports = router;

// // INSERT INTO tasks (task,completed)
// //   VALUES ('clean my roo',false) RETURNING *;
