const Activity = require("./../utils/createActivity");
const catchAsync = require("./../utils/catchAsync");

exports.getProjectActivities = catchAsync(async (req, res, next) => {
  const activities = await Activity.find({
    project: req.params.projectId,
  })
    .populate("user", "name")
    .sort("-createdAt");
  res.status(200).json({
    status: "success",
    results: activities.length,
    data: { activities },
  });
});
