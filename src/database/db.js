import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import {
  Permission,
  Role,
  Task,
  Team,
  TeamInvitation,
  TeamMember,
  User,
} from "../models/index.js";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const setupAssociations = () => {
  // user realtions
  User.hasMany(TeamInvitation, { foreignKey: "inviterId", as: "invitations" });
  User.hasMany(TeamInvitation, {
    foreignKey: "receiverId",
    as: "receivedInvitations",
  });
  User.hasMany(Task, { foreignKey: "createdById", as: "createdTasks" });
  User.hasMany(Task, { foreignKey: "assignedToUserId", as: "assignedTasks" });
  User.belongsToMany(Team, {
    through: TeamMember,
    foreignKey: "userId",
    as: "myTeams",
  });
  // team member relations
  TeamMember.belongsTo(User, { foreignKey: "userId", as: "user" });
  TeamMember.belongsTo(Team, { foreignKey: "teamId", as: "team" });
  // team realations
  Team.hasMany(TeamInvitation, { foreignKey: "teamId", as: "invitations" });
  Team.hasMany(Task, { foreignKey: "assignedToTeamId", as: "assignedTasks" });
  Team.belongsTo(User, { foreignKey: "adminId", as: "admin" });
  Team.belongsToMany(User, {
    through: TeamMember,
    as: "members",
  });
  // team invitation relations
  TeamInvitation.belongsTo(User, { foreignKey: "inviterId", as: "inviter" });
  TeamInvitation.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });
  TeamInvitation.belongsTo(Team, { foreignKey: "teamId", as: "team" });

  // task relations
  Task.belongsTo(User, { foreignKey: "createdById", as: "createdBy" });
  Task.belongsTo(User, { foreignKey: "assignedToUserId", as: "assignedTo" });
  Task.belongsTo(Team, {
    foreignKey: "assignedToTeamId",
    as: "assignedToTeam",
  });

  // permission relations
  Permission.belongsToMany(Role, {
    through: "RolePermissions",
  });
  // role relations
  Role.belongsToMany(Permission, {
    through: "RolePermissions",
  });
  Role.hasMany(TeamMember);
  TeamMember.belongsTo(Role);
};

export default sequelize;
