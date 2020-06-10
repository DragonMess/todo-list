import React from 'react';
import './Navigation.css'

function Navigation() {
    return (
        <div className = "nav">
            <form action = "">
                <label htmlFor="newTask">
                Add a new Task
                </label><br/>
                <input type="text" id = "task-txt" name = "task-txt"/>
                <button className = "add-btn"> +
                    <i className = "img-add-btn"></i>
                </button>
            </form>
        </div>

    )
}

export default Navigation;