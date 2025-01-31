import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import User from "./user.model.js";
import Team from "./team.model.js";

const TeamMember = sequelize.define(
  "TeamMember",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.ENUM("OWNER", "ADMIN", "MEMBER"),
      allowNull: false,
      defaultValue: "MEMBER",
    },
  },
  { timestamps: true }
);

User.belongsToMany(Team, { through: TeamMember });
Team.belongsToMany(User, { through: TeamMember });

export default TeamMember;
