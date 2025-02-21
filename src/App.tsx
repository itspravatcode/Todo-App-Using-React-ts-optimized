import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-center">Task Manager</h1>
        <TaskInput />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
