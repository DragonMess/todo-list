import React,{useState} from 'react';
import './Task.css';

const Task = ({id, task,completed , index, editTask, deleteTask}) => {

    const [editTxtTask, setTxtTask] = useState(task);
    const [readOnlyTaskTxt, setReadOnlyTaskTxt ] = useState(true);
   
    const [isHidden, setHidden] = useState(true);


    const submitDeleteTask = (event) => {
        event.preventDefault();
        deleteTask(id);

    }

    const submitEditTask = (event) => {

        event.preventDefault();
        setHidden(!isHidden);
        setReadOnlyTaskTxt(false);

        
    }

    const submitEditTaskOk = (event) => {
        event.preventDefault();
        if(editTxtTask) {
            setTxtTask(editTxtTask);
            setHidden(!isHidden);
            setReadOnlyTaskTxt(true);
        }else{
            alert("the field cannot be null")
        }

        // setTxtTask(editTxtTask)
    }

    return(
        <div className = "container-task">
            <form className = "task">
                <input className = "checkbox" type ="checkbox" onChange = {event => setTxtTask(event.target.value)} name = "task-chk"/>
                {/* <input type="text" desable="false" onChange = {editTask} value = {props.task}/> */}
                {/* <input className = {isHidden ? "task-txt" : "hidden"} htmlFor = "task1" value ={props.task} /> */}
                <input className = {isHidden ? "task-txt-edt" : "complete"} id={index} type="text" readOnly={readOnlyTaskTxt} onChange = {event => setTxtTask(event.target.value)}
                value = {editTxtTask}/>
                <div className = "btns">
                    <button className = {isHidden ? "edit-btn" : "hidden"}  onClick = {submitEditTask} >Edit</button>
                    <button className = {isHidden ? "delete-btn" : "hidden"} onClick = {submitDeleteTask}>Delete</button>
                    <button className = {isHidden ? "hidden" : "ok-btn"} onClick = {submitEditTaskOk}>Ok</button>
                </div>

            </form>
        </div>
    )
}
export default Task;