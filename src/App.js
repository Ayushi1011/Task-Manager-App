import "./App.css";
import TaskList from "./taskList";
import TaskForm from "./taskForm";
import { useEffect, useState } from "react";
import TaskManagement from "./taskManagement";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // Creating a local space
  const [filter, setFilter] = useState("all"); // Assigning default filter to 'all'

  // To fetch data from local storage to display
  useEffect(() => {
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedFilter = localStorage.getItem("filter") || "all";
    setTasks(existingTasks);
    setFilteredTasks(existingTasks);
    setFilter(savedFilter);
  }, []);

  // Add New Tasks
  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    updateFilteredTasks(newTasks, filter); // Reapplying the filter
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  // To Reapply the Filter Logic
  const updateFilteredTasks = (tasks, filter) => {
    let filteredTasks = [];
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "pending") {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else {
      filteredTasks = tasks;
    }
    setFilteredTasks(filteredTasks);
    localStorage.setItem("filteredTasks", JSON.stringify(filteredTasks));
    localStorage.setItem("filter", filter);
  };

  // Delete Task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateFilteredTasks(updatedTasks, filter); // Reapplying the filter after deletion
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // To Mark The Task as Complete
  const taskCompletion = (taskId) => {
    const completedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(completedTasks);
    updateFilteredTasks(completedTasks, filter); // Reapply the filter after completion
    localStorage.setItem("tasks", JSON.stringify(completedTasks));
  };

  return (
    <div className="bg-primary vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="header text-secondary text-center m-2">
          <h4>TASK MANAGER</h4>
        </div>

        <TaskForm addTask={addTask} />

        <div className="taskManagement mt-5">
          <TaskManagement
            tasks={tasks}
            setTasks={setTasks}
            filteredTasks={filteredTasks}
            setFilteredTasks={setFilteredTasks}
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        <div className="message">
          {filteredTasks.length === 0 ? (
            <div className="no-tasks text-center mt-5 text-secondary">
              <h5>N0 TASKS YET !!</h5>
            </div>
          ) : (
            <div className="taskList mt-3">
              <TaskList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                taskCompletion={taskCompletion}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
