import { TeamMember, Role } from "../models/index.js";
import RoleService from "./role.service.js";

const TeamMemberService = {
  async assignRoleToMember(userId, teamId, roleId) {
    const teamMember = await TeamMember.findOne({ where: { userId, teamId } });
    if (!teamMember) {
      throw new Error("User is not part of this team");
    }
    teamMember.roleId = roleId;
    await teamMember.save();

    return teamMember;
  },

  async addMemberToTeam(teamId, userId, roleId) {
    await TeamMember.create({
      userId: userId,
      teamId: teamId,
      roleId: roleId,
    });
  },
};

export default TeamMemberService;
