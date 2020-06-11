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

  const tasks = dataTask.map((taskData) => {
    return (
      <Task
        id={taskData.id}
        task={taskData.task}
        completed={taskData.completed}
      />
    );
  });
  const idRandom = dataTask.length;
  
  const addNewTask = (texTask) => {
    const newTask = {
      id: `a5236f8${idRandom}`,
      task: texTask,
      completed: false,
    };
    setTasksData([newTask,... dataTask]);
  };

  return (
    <>
      <main className="App">
        <header className="App-header" >
          <h1>TODO LIST</h1>
        </header>
        <Navigation addNewTask = {addNewTask}/>
        <section className="tasks">{tasks}</section>
      </main>
    </>
  );
}

export default App;
