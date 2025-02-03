import sequelize from "../database/db.js";
import { Role } from "./index.js";
import { DataTypes } from "sequelize";
import { User, Team } from "./index.js";

const TeamMember = sequelize.define(
  "TeamMember",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default TeamMember;
