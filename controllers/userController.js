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

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please Provide Email and Password!", 400));
    }
    const user = await User.findOne({ email }).select("+password"); //since default password won't be included in the query

    if (!user || (await user.correctPassword(password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};
