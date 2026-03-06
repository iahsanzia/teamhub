const express = require("express");
const router = express.Router();

const { protect } = require("./../middlewares/authMiddleware");
const {
  createTeam,
  getMyTeams,
  addMember,
  removeMember,

  deleteTeam,
} = require("./../controllers/teamController");

router.use(protect);

router.post("/", createTeam);
router.get("/", getMyTeams);

router.patch("/:teamId/add-member", addMember);
router.patch("/:teamId/remove-member/:userId", removeMember);

router.delete("/:teamId", deleteTeam);

module.exports = router;
