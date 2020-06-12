import React, { useState } from "react";
import "./App.css";
import Navigation from "./Navigation";
import Task from "./Task";

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
  const [dataTask, setTasksData] = useState(initialDataTask);

  const deleteTask = (taskId) => {
    // console.log()
    //updater le state avec toutes les tasks sauf celle avec taskId

    const newDataTask = dataTask.filter((taskObj) => taskObj.id !== taskId);
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
      />
    );
  });

  const addNewTask = (texTask) => {
    // const idRandom = dataTask.length;
    const idRandom = Math.random().toString(36).substring(2, 8);

    const newTask = {
      id: idRandom,
      task: texTask,
      completed: false,
    };
    console.log(newTask);
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
