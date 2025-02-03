import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
const TeamInvitation = sequelize.define(
  "TeamInvitation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "DECLINED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    teamId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    inviterId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default TeamInvitation;
