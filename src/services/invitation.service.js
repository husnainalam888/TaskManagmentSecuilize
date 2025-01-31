import Invitation from '../models/invitation.model.js';
import Team from '../models/team.model.js';
import TeamMember from '../models/teamMember.model.js';
import User from '../models/user.model.js';

class InvitationService {
  async sendInvitation(email, teamId) {
    try {
      const team = await Team.findByPk(teamId);
      if (!team) {
        throw new Error('Team not found');
      }

      const existingInvitation = await Invitation.findOne({
        where: { email, TeamId: teamId },
      });

      if (existingInvitation) {
        throw new Error('Invitation already sent to this email for this team');
      }

      const invitation = await Invitation.create({ email, TeamId: teamId });
      return invitation;
    } catch (error) {
      throw error;
    }
  }

  async getInvitations(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const invitations = await Invitation.findAll({
        include: [
          {
            model: Team,
          },
        ],
        where: { email: user.email },
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
        throw new Error('User not found');
      }
      const invitation = await Invitation.findByPk(invitationId);

      if (!invitation) {
        throw new Error('Invitation not found');
      }

      if (invitation.email !== user.email) {
        throw new Error(
          'You are not authorized to respond to this invitation'
        );
      }

      if (status === 'ACCEPTED') {
        await TeamMember.create({
          UserId: userId,
          TeamId: invitation.TeamId,
          role: 'MEMBER',
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


export default new InvitationService