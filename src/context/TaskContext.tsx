import { createContext, useReducer, useContext, useMemo, useCallback } from "react";

type Task = {
  text: string;
  complete: boolean;
};

type TaskAction =
  | { type: "ADD_TASK"; payload: string }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number };

type TaskState = Task[];

type TaskContextType = {
  tasks: TaskState;
  addTask: (text: string) => void;
  removeTask: (index: number) => void;
  toggleTask: (index: number) => void;
  completedCount: number;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { text: action.payload, complete: false }];
    case "REMOVE_TASK":
      return state.filter((_, index) => index !== action.payload);
    case "TOGGLE_TASK":
      return state.map((task, index) =>
        index === action.payload ? { ...task, complete: !task.complete } : task
      );
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const addTask = useCallback((text: string) => {
    dispatch({ type: "ADD_TASK", payload: text });
  }, []);

  const removeTask = useCallback((index: number) => {
    dispatch({ type: "REMOVE_TASK", payload: index });
  }, []);

  const toggleTask = useCallback((index: number) => {
    dispatch({ type: "TOGGLE_TASK", payload: index });
  }, []);

  const completedCount = useMemo(() => tasks.filter((task) => task.complete).length, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, completedCount }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
