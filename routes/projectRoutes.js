const express = require("express");
const router = express.Router({ mergeParams: true });

const { protect } = require("./../middlewares/authMiddleware");

const {
  createProject,
  getTeamProjects,
  updateProject,
  deleteProject,
} = require("./../controllers/projectController");

router.use(protect);

router.post("/:teamId/projects", createProject);

router.get("/:teamId/projects", getTeamProjects);

router.patch("project/:projectId", updateProject);

router.delete("project/:projectId", deleteProject);

module.exports = router;
