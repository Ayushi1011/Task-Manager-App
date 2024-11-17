import { useEffect } from "react";
import { SortIcon, FilterIcon } from "./icons";

function TaskManagement({
  tasks,
  setTasks,
  filteredTasks,
  setFilteredTasks,
  filter,
  setFilter,
}) {
  // Sort Logic like z-index (high to low)
  const sortTasksByPriority = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.priority === "High" && b.priority !== "High") return -1;
      if (a.priority === "Medium" && b.priority === "Low") return -1;
      if (a.priority === "Low" && b.priority === "Low") return 0;
      return 1;
    });
    setFilteredTasks(sortedTasks); // Update filteredTasks after sorting
    setTasks(sortedTasks);
    localStorage.setItem("tasks", JSON.stringify(sortedTasks));
  };

  // Filter Task
  const filterTasks = (status) => {
    setFilter(status);
    let filteredTasks = [];
    if (status === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (status === "pending") {
      filteredTasks = tasks.filter((task) => !task.completed);
    } else {
      filteredTasks = tasks;
    }
    setFilteredTasks(filteredTasks);
    localStorage.setItem("filter", status);
  };

  // Update filter when the page loads
  useEffect(() => {
    filterTasks(filter);
  }, [tasks, filter]);

  return (
    <div className="management-container  d-flex justify-content-between align-items-center">
      <button className="sortTask" onClick={sortTasksByPriority}>
        <SortIcon /> Sort by Priority
      </button>

      <div className="d-flex align-items-center gap-3">
        <FilterIcon />
        <select
          className="filterIT"
          onChange={(e) => filterTasks(e.target.value)}
          value={filter}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>
  );
}

export default TaskManagement;
