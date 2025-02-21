import { useTaskContext } from "../context/TaskContext";

const TaskList: React.FC = () => {
  const { tasks, removeTask, toggleTask, completedCount } = useTaskContext();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Tasks</h2>
      <p className="text-gray-600">Completed Tasks: {completedCount}</p>
      <ul className="mt-4 space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between p-2 border rounded-lg bg-white shadow-md">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" checked={task.complete} onChange={() => toggleTask(index)} />
              <span className={task.complete ? "line-through text-gray-500" : "text-black"}>{task.text}</span>
            </div>
            <button className="text-red-500 hover:text-red-700" onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
