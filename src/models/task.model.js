import sequelize from "../database/db.js";
import { DataTypes } from "sequelize";
import { Team, User } from "./index.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
    allowNull: false,
    defaultValue: "TODO",
  },
  priority: {
    type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
    allowNull: false,
    defaultValue: "MEDIUM",
  },
  assignedToUserId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  assignedToTeamId: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Task;
