const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const activityRoutes = require("./routes/activityRoutes");
const AppError = require("./utils/appError");

const app = express();

//Security Middleware
app.use(helmet());

//Enable CORS
app.use(cors());

//Logging
app.use(morgan("dev"));

//BODY PARSER
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("api/", projectRoutes);
app.use("/api", taskRoutes);
app.use("/api", activityRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "App Running",
  });
});

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
