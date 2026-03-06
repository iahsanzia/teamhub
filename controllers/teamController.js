const Team = require("./../models/Team");
const User = require("./../models/User");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createTeam = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  const team = await Team.create({
    name,
    description,
    owner: req.user.id,
    members: [req.user.id],
  });
  res.status(201).json({
    status: "success",
    data: { team },
  });
});

exports.getMyTeams = catchAsync(async (req, res, next) => {
  const teams = await Team.find({
    members: req.user.id,
  }).populate("owner members", "name email");

  res.status(200).json({
    status: "success",
    results: teams.length,
    data: { teams },
  });
});

exports.addMember = catchAsync(async (req, res, next) => {
  const { teamId } = req.params;
  const { userId } = req.body;

  const team = await Team.findById(teamId);

  if (!team) return next(new AppError("Team not found", 404));

  if (team.owner.toString() !== req.user.id)
    return next(new AppError("Only Owner can Add Members", 403));

  if (!team.members.includes(userId)) {
    team.members.push(userId);
    await team.save();
  }

  res.status(200).json({
    status: "success",
    data: { team },
  });
});

exports.removeMember = catchAsync(async (req, res, next) => {
  const { teamId, userId } = req.params;
  const team = await Team.findById(teamId);

  if (!team) return next(new AppError("Team not found", 404));
  if (team.owner.toString() !== req.user.id)
    return next(new AppError("Only Owner can remove member", 403));

  team.members = team.members.filter((member) => member.toString() !== userId);

  await team.save();

  res.status(200).json({
    status: "success",
    data: { team },
  });
});

exports.deleteTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.teamId);

  if (!team) return next(new AppError("Team not found"), 404);
  if (team.owner.toString() !== req.user.id)
    return next(new AppError("Only Owner delete team", 403));

  await team.deleteOne();

  res.status(200).json({
    status: "success",
    data: null,
  });
});
