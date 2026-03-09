const express = require("express");

const router = express.Router();

const { protect } = require("./../middlewares/authMiddleware");

const { getProjectActivities } = require("./../controllers/activityController");

router.use(protect);

router.get("/projects/:projectId/activity", getProjectActivities);

module.exports = router;
