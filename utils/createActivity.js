const Activity = require("./../models/Activity");

const createActivity = async ({ action, user, team, project, task }) => {
  await Activity.create({
    action,
    user,
    team,
    project,
    task,
  });
};

module.exports = createActivity;
