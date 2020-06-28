import React, { useState } from "react";
import "./Login.css";

const Login = (props) => {
  const { emailVerify } = props;
  const [logged, setLogged] = useState(false);
  const [textEmail, setTextEmail] = useState("");
  const [textPassword, setTextPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (textEmail && textPassword) {
      let valid = emailVerify(textEmail, textPassword);
      setLogged(valid);
    } else {
      alert("The info doesn't match");
    }
    console.log(textEmail);
    setTextEmail("");
    setTextPassword("");
  };

  return (
    <div className="log">
      <form>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => setTextEmail(e.target.value)}
          value={textEmail}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={(e) => setTextPassword(e.target.value)}
          value={textPassword}
        />
        <br />
        <br />
        <button className="log-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="reg-btn">Register</button>
      </form>
    </div>
  );
};
export default Login;
