import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Developer = sequelize.define(
  "Developer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, // hashed password
  },
  {
    timestamps: true,
  }
);

export default Developer;
