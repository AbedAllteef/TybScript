import React, { useState, useEffect } from "react";
import AnimalList from "./Animal/AnimalList"; // Import AnimalList component
import "./App.css";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskFilter, setTaskFilter] = useState("all");

  // 📌 Load tasks from localStorage on page load
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      console.log("🔍 Data loaded - localStorage:", JSON.parse(storedTasks));
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // 📌 Save tasks to localStorage on every change
  useEffect(() => {
    if (tasks.length > 0) {
      console.log("💾 Saving tasks - localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // 📌 Add new task
  const addTask = () => {
    if (taskTitle.trim() === "") return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
    };

    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save immediately
      return updatedTasks;
    });

    setTaskTitle("");
    setTaskDescription("");
  };

  // 📌 Toggle task completion status
  const toggleTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update immediately
      return updatedTasks;
    });
  };

  // 📌 Delete task
  const deleteTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Update immediately
      return updatedTasks;
    });
  };

  // 📌 Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (taskFilter === "completed") return task.completed;
    if (taskFilter === "not-completed") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task List </h1>

      {/* 📌 Task Input */}
      <div className="task-input">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task name..."
        />
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task description (optional)..."
        />
        <button onClick={addTask}>➕ Add Task</button>
      </div>

      {/* 📌 Task Filters */}
      <div className="task-filters">
        <button onClick={() => setTaskFilter("all")}>📋 All Tasks</button>
        <button onClick={() => setTaskFilter("completed")}>✅ Completed</button>
        <button onClick={() => setTaskFilter("not-completed")}>❌ Not Completed</button>
      </div>

      {/* 📌 Task Table */}
      <table className="task-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={4}>🔍 No Tasks</td>
            </tr>
          ) : (
            filteredTasks.map(task => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description || "No description"}</td>
                <td>{task.completed ? "✅ " : "❌"}</td>
                <td>
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? "↩ Mark as Not Completed" : "✔ Mark as Complete"}
                  </button>
                  <button onClick={() => deleteTask(task.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 📌 Call AnimalList component */}
      <AnimalList />
    </div>
  );
};

export default App;
