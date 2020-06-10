import React from 'react';
import './Task.css';

function Task(props) {
    const {id, task,completed } = props;
    console.log(props)
    return(
        <div className = "container-task">
            <form className = "task">
                <input className = "checkbox" type ="checkbox" name = "task-chk"/>
                <h4 className = "task-txt" htmlFor = "task1">{props.task}</h4>
                <div className = "btns">
                    <button className = "edit-btn" >Edit</button>
                    <button className = "delete-btn">Delete</button>
                </div>

            </form>
        </div>
    )
}
export default Task;