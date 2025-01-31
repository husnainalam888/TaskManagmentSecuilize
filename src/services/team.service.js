import Team from "../models/team.model.js";
import User from "../models/user.model.js";
import TeamMember from "../models/teamMember.model.js";

class TeamService {
  async createTeam({ name, description }) {
    try {
      const team = await Team.create({ name, description });
      return team;
    } catch (error) {
      throw error;
    }
  }

  async getTeams() {
    try {
      const teams = await Team.findAll({
        include: [
          {
            model: User,
            through: TeamMember,
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
      const team = await Team.findByPk(id);
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

  async removeMember(teamId, userId) {
    try {
      const teamMember = await TeamMember.findOne({
        where: { TeamId: teamId, UserId: userId },
      });
      if (!teamMember) {
        throw new Error("Team member not found");
      }
      await teamMember.destroy();
    } catch (error) {
      throw error;
    }
  }
}

export default new TeamService();
