import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NewTask from "./NewTask";
import Task from "./Task";
import axios from "axios";
import Login from "./Login";
import Nav from "./Nav";

const users = [
  { id: 1, email: "casa@gmail.com", password: "123" },
  { id: 2, email: "casa2@gmail.com", password: "123" },
  { id: 3, email: "casa3@gmail.com", password: "123" },
];

function App() {
  const [dataTask, setTasksData] = useState([]);
  let [tokenLog, setToken] = useState("");

  const login = (userLog) => {
    const user = {
      email: userLog.email,
      password: userLog.password,
    };
    axios({
      url: "/login",
      method: "POST",
      data: user,
    })
      .then((res) => {
        // le backend doit te renvoyer le token
        tokenLog = res.data.token;

        setToken(tokenLog);
        // token = res.data;
      })
      .catch((err) => console.log(err));
  };
  login({
    email: "casa@gmail.com",
    password: "camilo",
  });
  console.log("tokenLog", tokenLog);
  const getTodos = (url) => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${tokenLog}` } })
      .then((res) => setTasksData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTodos("/todos");
  }, []);

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

  // authenticateUser
  // separate into another function
  // findUserByEmail(email) => return the user object or false (Array.find)

  // const emailVerify = (emailTxt, passwordTxt) => {
  //   let valid;
  //   // const user = findUserByEmail(emailTxt)
  //   // if (user && user.password===passwordTxt)
  //   const someArray = users.map((item) => {
  //     if (item.email === emailTxt && item.password === passwordTxt) {
  //       return (valid = true);
  //     } else {
  //       return (valid = false);
  //     }
  //   });
  //   return valid;
  // };

  // const { isHide, setHide } = useState(false);

  // const submitLogin = (event) => {
  //   event.preventDefault();
  //   setHide(true);
  // };
  return (
    <>
      <Router>
        <Nav></Nav>
        <Route path="/login" component={Login} />
        <Route path="/todosLog" component={NewTask} />

        <main className="App">
          {/* <header className="App-header">
            <h1>TODO LIST</h1>
            <button
              className={isHide ? "hideLog" : "login=btn"}
              onClick={submitLogin}
            >
              Login
            </button>
          </header> */}

          {/* <NewTask addNewTask={addNewTask} />
          <section className="tasks">{tasks} </section> */}
        </main>
      </Router>
    </>
  );
}

export default App;
