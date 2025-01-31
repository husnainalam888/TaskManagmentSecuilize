import sequelize from "../database/db.js";
import User from "./user.model.js";
import Team from "./team.model.js";
import TeamMember from "./teamMember.model.js";
import Invitation from "./invitation.model.js";
import Task from "./task.model.js";

export default {
  sequelize,
  User,
  Team,
  TeamMember,
  Invitation,
  Task,
}
