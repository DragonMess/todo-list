import React from "react";
import './App.css'
import Navigation from "./Navigation";
import Task from "./Task";

const dataTask = [
  {
    id: "a5236f86",
    task: "Walk the dog",
    completed: false
  },
  {
    id: "a5236f87",
    task: "Study React",
    completed: false
  },
  {
    id: "a5236f88",
    task: "Make exercise",
    completed: true
  }
]

function App() {

  const tasks = dataTask.map(taskData=>{
    return (
      <Task id = {taskData.id} task = {taskData.task} completed = {taskData.completed}
      />
    )
    
  });

  return (
    <>
      <main className="App">
        <header className="App-header"> 
        <h1>TODO LIST</h1>
        </header>
        <Navigation />
        <section className = "tasks">
          {tasks}
        </section>
      </main>
    </>
  );
}

export default App;
