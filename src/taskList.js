import { DeleteIcon } from "./icons";

function TaskList({ tasks, deleteTask, taskCompletion }) {
  const isDeadlineNear = (deadline) => {
    const currentDate = new Date();
    const taskDate = new Date(deadline);
    const timeDifference = (taskDate - currentDate) / (1000 * 60 * 60 * 24); // To Change it's format into Days
    return timeDifference >= 0 && timeDifference <= 2;
  };

  return (
    <div className="task-list-container ">
      {tasks.map((task) => (
        //Creating Task List
        <li
          className={`list-group-item mb-3 d-flex flex-wrap gap-4 ${
            task.completed ? "text-decoration-line-through" : ""
          } ${
            !task.completed && isDeadlineNear(task.deadline)
              ? "bg-danger-translucent"
              : ""
          }`}
        >
          {/* Template Literals used to add text-decoration and highlight */}
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={task.completed}
            onChange={() => taskCompletion(task.id)}
          />
          <span className="task-name">{task.name}</span>
          <div className="d-flex align-items-center gap-5 ms-auto">
            <span
              className={`task-priority ${
                task.priority === "High"
                  ? "text-danger"
                  : task.priority === "Medium"
                  ? "text-warning"
                  : "text-success"
              }`}
            >
              {task.priority}
            </span>

            <span className="task-deadline">
              Deadline: {new Date(task.deadline).toLocaleDateString("en-GB")}
            </span>

            {/* Delete Button */}
            <button
              type="button"
              className="btn-icon"
              onClick={() => deleteTask(task.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        </li>
      ))}
    </div>
  );
}

export default TaskList;
