import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import TeamMember from "../models/teamMember.model.js";
import Role from "../models/role.model.js";
import Permission from "../models/permission.model.js";
import { Sequelize } from "sequelize";

class TeamService {
  async createTeam({ name, description }, adminId) {
    try {
      console.log("TeamService createTeam :", { name, description, adminId });
      const team = await Team.create({ name, description, adminId });
      return team;
    } catch (error) {
      throw error;
    }
  }

  async getTeams(userId) {
    try {
      const teams = await Team.findAll({
        where: {
          adminId: userId,
        },
        include: [
          {
            model: User,
            as: "admin",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "members",
            attributes: ["id", "name", "email"],
            through: { attributes: [] },
            include: [
              {
                model: TeamMember,
                as: "membership",
                attributes: ["roleId"],
                where: {
                  teamId: { [Sequelize.Op.col]: "Team.id" },
                },
                required: false,
                include: [
                  {
                    model: Role,
                    as: "role",
                    attributes: ["name"],
                    include: [
                      {
                        model: Permission,
                        as: "permissions",
                        attributes: ["id", "name"],
                        through: { attributes: [] },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      return teams;
    } catch (error) {
      throw error;
    }
  }

  async getTeamById(id) {
    try {
      const team = await Team.findByPk(id, {
        include: [
          {
            model: User,
            as: "admin",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "members",
            through: {
              attributes: ["role"],
            },
            attributes: ["id", "name", "email"],
          },
        ],
      });
      if (!team) {
        throw new Error("Team not found");
      }
      return team;
    } catch (error) {
      throw error;
    }
  }

  async deleteTeam(id) {
    try {
      const team = await Team.findByPk(id);
      if (!team) {
        throw new Error("Team not found");
      }
      await team.destroy();
    } catch (error) {
      throw error;
    }
  }

  async addMember(teamId, userId, role = "MEMBER") {
    try {
      const team = await Team.findByPk(teamId);
      const user = await User.findByPk(userId);
      if (!team || !user) {
        throw new Error("Team or User not found");
      }
      const teamMember = await TeamMember.create({
        TeamId: teamId,
        UserId: userId,
        role,
      });
      return teamMember;
    } catch (error) {
      throw error;
    }
  }

  async removeMember(teamId, userId, adminId) {
    try {
      const teamMember = await TeamMember.findOne({
        where: { TeamId: teamId, UserId: userId, adminId: userId },
      });
      if (!teamMember) {
        throw new Error("Team member not found");
      }
      await teamMember.destroy();
    } catch (error) {
      throw error;
    }
  }
  async getMyTeams(userId) {
    try {
      const team = await Team.findAll({
        where: {
          adminId: userId,
        },
        include: [
          {
            model: User,
            as: "admin",
            attributes: ["id", "name", "email"],
          },
          {
            model: User,
            as: "members",
            through: {
              attributes: ["role"],
            },
            attributes: ["id", "name", "email"],
          },
        ],
      });
      if (!team) {
        throw new Error("Team not found");
      }
      return team;
    } catch (error) {
      throw error;
    }
  }

  async getTeamsStats() {
    try {
      const stats = await Team.findAll({
        attributes: ["name"],
      });
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

export default new TeamService();
