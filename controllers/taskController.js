const Task = require("../models/Task");
const Project = require("../models/Project");
const Team = require("../models/Team");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createTask = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { title, description, assignedTo, dueDate } = req.body;

  const project = await Project.findById(projectId).populate("team");

  if (!project) return next(new AppError("Project NOT FOUND", 404));

  const team = await Team.findById(project.team);

  if (!team.members.includes(req.user.id))
    return next(new AppError("You are not a member of this team", 403));

  const task = await Task.create({
    title,
    description,
    project: projectId,
    assignedTo,
    dueDate,
    createdBy: req.user.id,
  });

  res.status(200).json({
    status: "success",
    data: { task },
  });
});

exports.getProjectTasks = cathcAsync(async (req, res, next) => {
  const tasks = await Task.find({
    project: req.params.projectId,
  }).populate("assignedTo", "name email");

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: { tasks },
  });
});

exports.updateTasks = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) return next(new AppError("Task Not Found", 404));

  res.status(200).json({
    status: "success",
    data: { task },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.taskId);
  if (!task) return next(new AppError("Task Not Found", 404));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
