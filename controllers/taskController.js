const Task = require("../models/task");

// Controller function to GET all tasks with pagination
const getAllTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await Task.find()
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

// Controller function to GET a task by ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "تسکی یافت نشد." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

// Controller function to POST a new task
const addTask = async (req, res) => {
  const { title, description, time, completed } = req.body;
  try {
    const task = new Task({
      title,
      description,
      time,
      completed,
      user: req.user._id,
    });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

// Controller function to DELETE a task by ID
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      await task.remove();
      res.json({ message: "تسک مورد نظر حذف شد." });
    } else {
      res.status(404).json({ message: "تسکی یافت نشد." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

// Controller function to PUT update a task by ID
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      Object.assign(task, req.body);
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: "تسکی یافت نشد." });
    }
  } catch (error) {
    res.status(500).json({ message: `Error ${error}` });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  deleteTask,
  updateTask,
};
