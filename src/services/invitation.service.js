import Invitation from "../models/invitation.model.js";
import Team from "../models/team.model.js";
import TeamMember from "../models/teamMember.model.js";
import User from "../models/user.model.js";

class InvitationService {
  async sendInvitation({ receiverId, teamId, inviterId }) {
    try {
      const team = await Team.findByPk(teamId);
      if (!team) {
        throw new Error("Team not found");
      }

      const existingInvitation = await Invitation.findOne({
        where: { receiverId, teamId, inviterId },
      });

      if (existingInvitation) {
        throw new Error(
          "Invitation already sent to this receiverId for this team"
        );
      }

      const invitation = await Invitation.create({
        receiverId,
        teamId,
        inviterId,
      });
      return invitation;
    } catch (error) {
      throw error;
    }
  }

  async getInvitations(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const invitations = await Invitation.findAll({
        include: [
          {
            model: Team,
            as: "team",
          },
          {
            model: User,
            as: "inviter",
          },
          {
            model: User,
            as: "receiver",
          },
        ],
      });
      return invitations;
    } catch (error) {
      throw error;
    }
  }

  async respondInvitation(invitationId, userId, status) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      let invitation = await Invitation.findByPk(invitationId);

      if (!invitation) {
        throw new Error("Invitation not found");
      }
      console.log(
        "invitation",
        invitation.receiverId,
        userId,
        invitation.receiverId == userId
      );
      if (invitation.receiverId !== userId) {
        throw new Error("You are not authorized to respond to this invitation");
      }

      if (status === "ACCEPTED") {
        await TeamMember.create({
          userId: userId,
          teamId: invitation.teamId,
          role: "MEMBER",
        });
      }

      invitation.status = status;
      await invitation.save();
      return invitation;
    } catch (error) {
      throw error;
    }
  }
}

export default new InvitationService();
