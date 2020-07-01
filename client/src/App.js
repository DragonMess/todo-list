import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from "./Login";
import Nav from "./Nav";
import Todo from "./Todo";

function App() {
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
      })
      .catch((err) => console.log(err));
  };
  login({
    email: "casa@gmail.com",
    password: "camilo",
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
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route
            path="/todo"
            render={(props) => <Todo {...props} tokenLog={tokenLog} />}
          />
        </Switch>
      </Router>
    </>
  );
}
const Home = () => {
  return (
    <div className="App">
      <h1>Welcome to my todolist</h1>
      <br />
      <br />
      <h2> This application was builded with:</h2>
      <h3> React</h3>
      <h3> Nodejs</h3>
      <h3> Postgres</h3>
    </div>
  );
};

export default App;
