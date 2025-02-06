import TeamMemberService from "../services/teamMember.service.js";

const TeamMemberController = {
  async assignRole(req, res) {
    try {
      const { userId, teamId, roleId } = req.body;

      if (!userId || !teamId || !roleId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const updatedTeamMember = await TeamMemberService.assignRoleToMember(
        userId,
        teamId,
        roleId
      );
      res.json(updatedTeamMember);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default TeamMemberController;
