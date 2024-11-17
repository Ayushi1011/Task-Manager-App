import "./App.css";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AddIcon } from "./icons.js";

function TaskForm({ addTask }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [taskName, setTaskName] = useState("");

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleAddClick = (event) => {
    event.preventDefault();

    if (!taskName || !priority || !selectedDate) {
      alert("Please fill all the fields!!");
      return;
    }

    const taskDetails = {
      id: Date.now(),
      name: taskName,
      priority,
      deadline: selectedDate,
      completed: false,
    };

    addTask(taskDetails);

    // Clean Form Fields After Submitting
    setTaskName("");
    setPriority("");
    setSelectedDate(null);
  };

  return (
    <form>
      <div className="navBarForm">
        {/* To Create a Task Box */}
        <div className="form-group">
          <label className="task text-secondary">Task Name</label>
          <input
            type="text"
            className="task-box"
            id="taskName"
            placeholder=" Discription.."
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </div>

        {/* Drop-Down for Priority */}
        <div className="form-group">
          <label className="form-label mb-0 text-secondary">
            Priority Level
          </label>
          <div className="dropDown">
            <select
              className="priority"
              value={priority}
              onChange={handlePriorityChange}
            >
              {/* Disabled to prevent the user from selecting "select" option again once they’ve made another choice */}
              <option value="" disabled>
                Select
              </option>
              <option value="High" className="high">
                High
              </option>
              <option value="Medium" className="medium">
                Medium
              </option>
              <option value="Low" className="low">
                Low
              </option>
            </select>
          </div>
        </div>

        {/* Datepicker */}
        <div className="form-group">
          <label className="form-label mb-0 text-secondary">
            Task Deadline
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            id="taskDate"
            name="taskDate"
            placeholderText=" Select The Deadline"
            dateFormat="dd/MM/yyy"
            minDate={new Date()}
          />
        </div>

        {/* Add Button */}
        <div className="addButton mt-4">
          <button
            type="button"
            className="btn btn-outline-myCustomColor"
            onClick={handleAddClick}
          >
            <AddIcon /> ADD
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
