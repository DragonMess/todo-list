import React,{useState} from 'react';
import './Task.css';

function Task(props) {
    const {id, task,completed } = props;

    const [editTxtTask, setTxtTask] = useState(task);

    const editTask = (event) => {
        setTxtTask(event.target.value)
        
    }
    const submitEditTask = (event) => {
        event.preventDefault();
        editTask(props.Task)
        setTxtTask()
    }

    return(
        <div className = "container-task">
            <form className = "task">
                <input className = "checkbox" type ="checkbox" name = "task-chk"/>
                {/* <input type="text" desable="false" onChange = {editTask} value = {props.task}/> */}
                <h4 className = "task-txt" htmlFor = "task1">{props.task}</h4>
                <input type="text" name = "task-txt" onChange = {event => setTxtTask(event.target.value)} value = {editTxtTask} />
                <div className = "btns">
                    <button className = "edit-btn" onClick = {submitEditTask} >Edit</button>
                    <button className = "delete-btn">Delete</button>
                </div>

            </form>
        </div>
    )
}
export default Task;