module.exports = function (db) {
  const getTodos = () => {
    return (
      db
        .query(`SELECT * FROM tasks`)
        // .then((todosObj) => res.json(todosObj.rows));
        .then((dbRes) => dbRes.rows)
    );
  };

  // // url: /todos/
  // // pas de 'new' avec le post
  const postTodo = (todosObj) => {
    //   // Asign array of values to use in queryString
    const userValues = [todosObj.task, todosObj.completed];

    let queryString = `INSERT INTO tasks (task,completed)
      VALUES ($1::text,$2::boolean) RETURNING *;`;

    return db.query(queryString, userValues).then((dbRes) => dbRes.rows[0]);
  };
  const deleteTodo = (idObj) => {
    let userValues = [idObj];

    let queryString = `DELETE FROM tasks
      WHERE id = $1 RETURNING *;`;
    return db.query(queryString, userValues).then((dbRes) => dbRes.rows[0]);
  };
  const editTodo = (userObj) => {
    // console.log(userObj);
    const userValues = [userObj.id, userObj.task, userObj.completed];
    let queryString = `UPDATE tasks SET task = $2, completed = $3
  WHERE id = $1 RETURNING *;`;
    return db.query(queryString, userValues).then((dbRes) => dbRes.rows[0]);
  };

  return {
    getTodos,
    postTodo,
    deleteTodo,
    editTodo,
  };
};
