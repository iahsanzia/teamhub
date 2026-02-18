const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");

//JWT token creation
const signToken = (id) => {
  return (
    jwt.sign({ id }, process.env.JWT_SECRET),
    {
      expiresIn: "7d",
    }
  );
};

//Register User

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};
