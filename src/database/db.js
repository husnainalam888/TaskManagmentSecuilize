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
  App,
  AppCredential,
  Message,
  Conversation,
  ConversationParticipant,
  Developer,
} from "../models/index.js";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const setupAssociations = () => {
  

  // Developer - Apps
  Developer.hasMany(App, { foreignKey: "developerId", as: "apps" });
  App.belongsTo(Developer, { foreignKey: "developerId", as: "developer" });

  // App - AppCredentials
  App.hasOne(AppCredential, { foreignKey: "appId", as: "credentials" });
  AppCredential.belongsTo(App, { foreignKey: "appId", as: "app" });

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
  User.hasMany(TeamMember, { foreignKey: "userId", as: "membership" });

  // team member relations
  TeamMember.belongsTo(User, { foreignKey: "userId", as: "user" });
  TeamMember.belongsTo(Team, { foreignKey: "teamId", as: "team" });
  TeamMember.belongsTo(Role, { foreignKey: "roleId", as: "role" });
  // team realations
  Team.hasMany(TeamInvitation, { foreignKey: "teamId", as: "invitations" });
  Team.hasMany(Task, { foreignKey: "assignedToTeamId", as: "assignedTasks" });
  Team.belongsTo(User, { foreignKey: "adminId", as: "admin" });
  Team.belongsToMany(User, {
    through: TeamMember,
    foreignKey: "teamId",
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
    as: "roles",
  });
  // role relations
  Role.belongsToMany(Permission, {
    through: "RolePermissions",
    as: "permissions",
  });


  // Message Relations
  Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
  Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });
  Message.belongsTo(Conversation, {
    foreignKey: "conversationId",
    as: "conversation",
  });
  Conversation.hasMany(Message, {
    foreignKey: "conversationId",
    as: "messages",
  });
  Conversation.belongsToMany(User, {
    through: ConversationParticipant,
    foreignKey: "conversationId",
    as: "participants",
  });
  User.belongsToMany(Conversation, {
    through: ConversationParticipant,
    foreignKey: "userId",
    as: "conversations",
  });
  Role.hasMany(TeamMember, { foreignKey: "roleId", as: "members" });
};

export default sequelize;
