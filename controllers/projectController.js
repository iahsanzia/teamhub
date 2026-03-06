const Project = require("./../models/Project");
const Team = require("./../models/Team");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createProject = catchAsync(async (req, res, next) => {
  const { teamId } = req.params;
  const { name, description } = req.body;

  const team = await Team.findById(teamId);

  if (!team) return next(new AppError("Team NOT FOUND", 404));

  if (!team.members.includes(req.user.id))
    return next(new AppError("You are not a member of this team", 403));

  const project = await Project.create({
    name,
    description,
    team: teamId,
    createdBy: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: { project },
  });
});
