import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="nav">
        <h3>Camilo's Todolist</h3>
        <ul className="nav-links">
          <Link to="/todo">
            <li className="navLi">TODOLIST</li>
          </Link>

          <Link to="/login">
            <li className="navLi">Login</li>
          </Link>

          <Link to="/register">
            <li className="navLi">Register</li>
          </Link>

          <Link to="/about">
            <li className="navLi">About</li>
          </Link>
        </ul>
      </div>
    </>
  );
};
export default Nav;
