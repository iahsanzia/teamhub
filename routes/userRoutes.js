const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getme,
  updatePassword,
} = require("./../controllers/userController");
const { protect } = require("./../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getme);
router.patch("/updatePassword", protect, updatePassword);

module.exports = router;
