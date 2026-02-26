const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");

//JWT token creation
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//Register User

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = signToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    data: { user },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please Provide Email and Password!", 400));
  }
  const user = await User.findOne({ email }).select("+password"); //since default password won't be included in the query

  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);

  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
    data: { user },
  });
});

exports.getme = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.correctPassword(currentPassword))) {
    return next(new AppError("Current Password is Incorrect", 401));
  }

  user.password = newPassword;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({
    status: "success",
    token,
  });
});
