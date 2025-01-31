import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import User from "./user.model.js";
import Team from "./team.model.js";

const Invitation = sequelize.define("Invitation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  status: {
    type: DataTypes.ENUM("PENDING", "ACCEPTED", "DECLINED"),
    allowNull: false,
    defaultValue: "PENDING",
  },
}, { timestamps: true });

Invitation.belongsTo(Team);
Team.hasMany(Invitation);

export default Invitation;
