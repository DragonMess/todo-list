import axios from "axios";
import App from "./App";

const QueryHandler = () => {
  const { setTasksData } = App;
  const url = "/todos";
  function getTodo() {
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
  }
};

export default QueryHandler;
