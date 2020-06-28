import React, { useEffect, useState } from "react";
import axios from "axios";

// let initialDataTask = [
// {
//   id: "a5236f82",
//   task: "Walk the dog",
//   completed: false,
// },
// {
//   id: "a5236f81",
//   task: "Study React",
//   completed: false,
// },
// {
//   id: "a5236f80",
//   task: "Make exercise",
//   completed: true,
// },
// ];

const useGetTodos = () => {
  let initialDataTask = [];
  const url = "/todos";

  const [dataTask, setTasksData] = useState(initialDataTask);

  const getTodos = () => {
    useEffect(() => {
      axios
        .get(url)
        .then(function (response) {
          // handle success
          console.log(response.data);
          setTasksData(response.data);
        })
        .catch(function (error) {
          // handle error
          // console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }, []);
  };
  const deleteTask = (taskId) => {
    //updater le state avec toutes les tasks sauf celle avec taskId
    const newDataTask = dataTask.filter((taskObj) => taskObj.id !== taskId);
    setTasksData(newDataTask);
  };

  const completedTask = (completedTask, taskId) => {
    // Loop through all the tasks of taskData. if the id === taskId, change task content
    // if the id !== taskId => leave without change
    const newDataTask = dataTask.map((taskObj) => {
      if (taskObj.id === taskId) {
        taskObj.completed = completedTask;
        return taskObj;
      } else {
        return taskObj;
      }
    });
    // update the state
    setTasksData(newDataTask);
  };

  const editTask = (texTask, taskId) => {
    // Loop through all the tasks of taskData. if the id === taskId, change task content
    // if the id !== taskId => leave without change
    const newDataTask = dataTask.map((taskObj) => {
      if (taskObj.id === taskId) {
        taskObj.task = texTask;
        return taskObj;
      } else {
        return taskObj;
      }
    });
    // update the state
    setTasksData(newDataTask);
  };

  const addNewTask = (texTask) => {
    const idRandom = Math.random().toString(36).substring(2, 8);

    const newTask = {
      id: idRandom,
      task: texTask,
      completed: false,
    };
    setTasksData([newTask, ...dataTask]);
  };

  return dataTask;
};

export default useGetTodos;

// ========== AXIOS +++ ==============Axios =============

// ========= addNewtask and post  ===============

const saveNewTask = (newTask) => {
  return axios({
    url: "/todos/task",
    method: "POST",
    data: newTask,
  }).then((result) => result.data);
};

const addNewTask = (texTask) => {
  const newTask = {
    task: texTask,
    completed: false,
  };
  // appeler une function pour ajouter a la bd and return a promise
  // .then => setTasksData
  saveNewTask(newTask)
    .then((response) => {
      // console.log(response);
      setTasksData([newTask, ...dataTask]);
    })
    .catch((err) => console.log(err));
};

// ========= Delete exist task and Update State  ===============

const eliminateTask = (taskId) => {
  return axios({
    url: "/todos/task",
    method: "DELETE",
    data: taskId,
  }).then((res) => res.data);
};

const deleteTask = (taskId) => {
  const deleteTask = {
    id: taskId,
  };
  //updater le state avec toutes les tasks sauf celle avec taskId
  const newDataTask = dataTask.filter((taskObj) => taskObj.id !== taskId);
  // appeler une function pour delete a la bd and return a promise
  eliminateTask(deleteTask).then((response) => {
    // update state
    setTasksData(newDataTask);
  });
};
