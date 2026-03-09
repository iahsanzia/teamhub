const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect } = require("./../middlewares/authMiddleware");

const {
  createTask,
  getProjectTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.use(protect);

router.post("/projects/:projectId/tasks", createTask);

router.get("/projects/:projectId/tasks", getProjectTasks);

router.get("/tasks/my-tasks", getMyTasks);

router.patch("/tasks/:taskId", updateTask);

router.delete("/tasks/:taskId", deleteTask);

module.exports = router;
