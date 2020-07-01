import React, { useState, useEffect } from "react";
import "./App.css";
import NewTask from "./NewTask";
import Task from "./Task";
import axios from "axios";

function Todo(props) {
  const [dataTask, setTasksData] = useState([]);
  let { tokenLog } = props;

  const getTodos = (url, token) => {
    axios({
      method: "GET",
      url: url,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setTasksData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTodos("/todos", tokenLog);
  }, [tokenLog]);

  // ========= addNewtask and post  ===============

  const addNewTask = (texTask) => {
    const newTask = {
      task: texTask,
      completed: false,
    };
    axios({
      // According to REST, the url should be /todos
      // never use a /new in a post. new is not the name of the resource.
      url: "/todos",
      method: "POST",
      data: newTask,
    })
      .then((res) => {
        // le backend doit te renvoyer le id
        // res.data => id
        console.log(res.data);
        newTask.id = res.data;

        setTasksData([newTask, ...dataTask]);
      })
      .catch((err) => console.log(err));
  };

  // ========= Delete exist task and Update State  ===============

  const deleteTask = (taskId) => {
    const idTask = Number(taskId);
    const deleteObj = { id: `${idTask}` };
    const newDataTask = dataTask.filter((taskObj) => taskObj.id !== idTask);
    // url according to REST should be /todos/${id}
    // must specify the id to delete
    // no need for delete in the url because the verb (method) does specify it
    axios({
      url: `/todos/${taskId}`,
      method: "DELETE",
      data: deleteObj,
    })
      .then(() => setTasksData(newDataTask))
      .catch((err) => console.log(err));
  };

  const editTask = (taskText, taskId, taskCompleted) => {
    const editObj = {
      id: taskId,
      task: taskText,
      completed: taskCompleted,
    };
    const newDataTask = dataTask.map((taskObj) => {
      if (taskObj.id === taskId) {
        taskObj.task = taskText;
        return taskObj;
      } else {
        return taskObj;
      }
    });
    axios({
      url: `/todos/${taskId}`,
      method: "PUT",
      data: editObj,
    })
      .then(() => setTasksData(newDataTask))
      .catch((err) => console.log(err));
  };

  const tasks = dataTask.map((taskData, index) => {
    return (
      <Task
        key={taskData.id}
        index={index}
        id={taskData.id}
        task={taskData.task}
        completed={taskData.completed}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );
  });

  return (
    <>
      <main className="App">
        <NewTask addNewTask={addNewTask} />
        <section className="tasks">{tasks} </section>
      </main>
    </>
  );
}

export default Todo;
