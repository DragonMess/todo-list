import React, { useState } from "react";
import "./NewTask.css";

const NewTask = ({ addNewTask }) => {
  // const { addNewTask } = props;
  const [txtTask, setTxtTask] = useState("");

  const submitTask = (event) => {
    event.preventDefault();
    if (txtTask) {
      addNewTask(txtTask);
      setTxtTask("");
    } else {
      alert("the field cannot be null");
    }
  };

  return (
    <div className="new">
      <form>
        <label htmlFor="newTask">Add a new Task</label>
        <br />
        <input
          type="text"
          placeholder="Enter a new task"
          name="task-txt"
          onChange={(event) => setTxtTask(event.target.value)}
          value={txtTask}
        />
        <button className="add-btn" onClick={submitTask}>
          {" "}
          +
        </button>
      </form>
    </div>
  );
};

export default NewTask;
