// models/AppCredential.js
import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const AppCredential = sequelize.define(
  "AppCredential",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    appId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: { type: DataTypes.DATE }, // optional
  },
  {
    timestamps: true,
  }
);

export default AppCredential;
