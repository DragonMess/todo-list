import React, {useState} from 'react';
import './Navigation.css'

function Navigation(props) {
    const { addNewTask } = props;
    const [txtTask, setTxtTask] = useState("");
    const addTxtTask = (event) => {
        setTxtTask(event.target.value)
    }
    const submitTask = event => {
        event.preventDefault()
        addNewTask(txtTask);
        setTxtTask("")
    }

    return (
        <div className = "nav">
            <form action = "">
                <label htmlFor="newTask">
                Add a new Task
                </label><br/>
                <input type="text" placeholder = "Enter a new task" name = "task-txt" onChange = {addTxtTask} value = {txtTask} />
                <button className = "add-btn" onClick = {submitTask}> +
                </button>
            </form>
        </div>

    )
}

export default Navigation;