const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

const verifyToken = require("../middlewares/authMiddleware");

// GET all tasks with pagination
router.get("/tasks", verifyToken, taskController.getAllTasks);

// GET a task by ID
router.get("/task/:id", verifyToken, taskController.getTaskById);

// POST a new task
router.post("/task/add", verifyToken, taskController.addTask);

// DELETE a task by ID
router.delete("/task/delete/:id", verifyToken, taskController.deleteTask);

// PUT update a task by ID
router.put("/task/update/:id", verifyToken, taskController.updateTask);

module.exports = router;
