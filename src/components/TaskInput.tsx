import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskInput: React.FC = () => {
  const [newTask, setNewTask] = useState("");
  const { addTask } = useTaskContext();

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="p-4 flex space-x-2">
      <input type="text" className="border p-2 rounded-lg flex-grow" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
