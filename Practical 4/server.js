const express = require("express");

const app = express();

// JSON data read karva mate
app.use(express.json());

// Temporary tasks data
let tasks = [
  {
    id: 1,
    title: "Learn Express",
    completed: false,
  },
  {
    id: 2,
    title: "Build Task API",
    completed: true,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// GET All Tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// POST New Task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

//Put Route(Update Task)
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.title = req.body.title || task.title;
  task.completed =
    req.body.completed !== undefined
      ? req.body.completed
      : task.completed;

  res.status(200).json(task);
});

//Delete Route
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
  });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});