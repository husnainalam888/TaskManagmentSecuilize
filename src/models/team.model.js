import { Task, TeamInvitation, TeamMember, User } from "./index.js";
import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    adminId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Team;
