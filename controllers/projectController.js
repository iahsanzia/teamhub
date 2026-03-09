const Project = require("./../models/Project");
const Team = require("./../models/Team");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const createActivity = require("../utils/createActivity");

exports.createProject = catchAsync(async (req, res, next) => {
  const { teamId } = req.params;
  const { name, description } = req.body;

  const team = await Team.findById(teamId);

  if (!team) return next(new AppError("Team NOT FOUND", 404));

  if (!team.members.some((member) => member.toString() === req.user.id))
    return next(new AppError("You are not a member of this team", 403));

  const project = await Project.create({
    name,
    description,
    team: teamId,
    createdBy: req.user.id,
  });

  await createActivity({
    action: "created a project",
    user: req.user.id,
    project: project._id,
  });

  res.status(201).json({
    status: "success",
    data: { project },
  });
});

exports.getTeamProjects = catchAsync(async (req, res, next) => {
  const { teamId } = req.params;

  const projects = await Project.find({ team: teamId });

  res.status(200).json({
    status: "success",
    results: projects.length,
    data: { projects },
  });
});

exports.updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(
    req.params.projectId,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!project) return next(new AppError("Project not Found", 404));

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.projectId);
  if (!project) return next(new AppError("Project not Found", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});
