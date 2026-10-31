const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Task = require('./models/Task');

const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Connect to MongoDB Database
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully to:', MONGO_URI))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ==========================================
// CRUD ENDPOINTS
// ==========================================

// Helper function to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @route   GET /tasks
 * @desc    Fetch all tasks from database
 */
app.get(
  '/tasks',
  asyncHandler(async (req, res) => {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  })
);

/**
 * @route   GET /tasks/:id
 * @desc    Fetch a single task by ID
 * @note    Returns 404 JSON response if ID does not exist
 */
app.get(
  '/tasks/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task not found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  })
);

/**
 * @route   POST /tasks
 * @desc    Create a new task in MongoDB
 */
app.post(
  '/tasks',
  asyncHandler(async (req, res) => {
    const { title, description, completed, priority } = req.body;
    
    // Using new Task() & save() to ensure pre-save hooks (title trimming) execute
    const task = new Task({ title, description, completed, priority });
    await task.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  })
);

/**
 * @route   PUT /tasks/:id
 * @desc    Update a task by ID
 */
app.put(
  '/tasks/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, completed, priority } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task not found with ID: ${id}`,
      });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    if (priority !== undefined) task.priority = priority;

    await task.save(); // Triggers pre-save hook and schema validations

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  })
);

/**
 * @route   DELETE /tasks/:id
 * @desc    Delete a task by ID
 */
app.delete(
  '/tasks/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task not found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task,
    });
  })
);

// ==========================================
// STRUCTURED GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
  console.error('⚠️ Error Handler Caught:', err);

  // 1. Mongoose Validation Error (e.g., missing required fields or invalid enum value)
  if (err.name === 'ValidationError') {
    const details = {};
    Object.keys(err.errors).forEach((key) => {
      details[key] = err.errors[key].message;
    });

    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: details,
    });
  }

  // 2. Mongoose Cast Error (e.g., invalid ObjectId format)
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Resource not found. Invalid ID format: ${err.value}`,
    });
  }

  // 3. Fallback for generic Server Errors
  res.status(err.status || 500).json({
    success: false,
    error: 'Server Error',
    message: err.message || 'An unexpected error occurred on the server',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
