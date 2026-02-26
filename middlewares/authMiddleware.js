const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const AppError = require("./../utils/appError");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("Your are not logged in", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); //token verification

  //checking if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User no longer exists", 401));
  }

  req.user = currentUser; //attaching user to request
  next();
};
