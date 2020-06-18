import React, { useState } from "react";
import "./App.css";
import Navigation from "./Navigation";
import Task from "./Task";
import axios from "axios";

const initialDataTask = [
  {
    id: "a5236f82",
    task: "Walk the dog",
    completed: false,
  },
  {
    id: "a5236f81",
    task: "Study React",
    completed: false,
  },
  {
    id: "a5236f80",
    task: "Make exercise",
    completed: true,
  },
];

function App() {
  // const postSome = function () {
  //   axios
  //     .post(`/todos/task`, {
  //       task: "hacer algo con los chiquis",
  //       completed: "false",
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  // postSome();

  // var sadf = "http://regres.in/api/users";
  // var jasonHolder = "http://jsonplaceholder.typicode.com/todos";

  const url = "/todos";
  function getTodos() {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }
  getTodos();

  const [dataTask, setTasksData] = useState(initialDataTask);

  const deleteTask = (taskId) => {
    //updater le state avec toutes les tasks sauf celle avec taskId
    const newDataTask = dataTask.filter((taskObj) => taskObj.id !== taskId);
    setTasksData(newDataTask);
  };

  const completedTask = (completedTask, taskId) => {
    // Loop through all the tasks of taskData. if the id === taskId, change task content
    // if the id !== taskId => leave without change
    const newDataTask = dataTask.map((taskObj) => {
      if (taskObj.id === taskId) {
        taskObj.completed = completedTask;
        return taskObj;
      } else {
        return taskObj;
      }
    });
    // update the state
    setTasksData(newDataTask);
  };

  const editTask = (texTask, taskId) => {
    // Loop through all the tasks of taskData. if the id === taskId, change task content
    // if the id !== taskId => leave without change
    const newDataTask = dataTask.map((taskObj) => {
      if (taskObj.id === taskId) {
        taskObj.task = texTask;
        return taskObj;
      } else {
        return taskObj;
      }
    });
    // update the state
    setTasksData(newDataTask);
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
        completedTask={completedTask}
      />
    );
  });

  const addNewTask = (texTask) => {
    const idRandom = Math.random().toString(36).substring(2, 8);

    const newTask = {
      id: idRandom,
      task: texTask,
      completed: false,
    };
    setTasksData([newTask, ...dataTask]);
  };

  return (
    <>
      <main className="App">
        <header className="App-header">
          <h1>TODO LIST</h1>
        </header>
        <Navigation addNewTask={addNewTask} />
        <section className="tasks">{tasks} </section>
      </main>
    </>
  );
}

export default App;
