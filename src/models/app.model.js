// models/App.js
import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const App = sequelize.define(
  "App",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    developerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default App;
