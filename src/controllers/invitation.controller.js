import * as invitationService from '../services/invitation.service.js';

const sendInvitation = async (req, res) => {
  try {
    const invitation = await invitationService.sendInvitation(req.body.email, req.body.teamId);
    res.status(201).json({ message: 'Invitation sent successfully', invitation });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};  

const getInvitations = async (req, res) => {
  try {
    const userId = req.user.id;
    const invitations = await invitationService.getInvitations(userId);
    res.json(invitations);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }  
};  

const respondInvitation = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id;
    const invitation = await invitationService.respondInvitation(id, userId, req.body.status);
    res.json({ message: `Invitation ${req.body.status.toLowerCase()}`, invitation });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });  
  }  
};

export { sendInvitation, getInvitations, respondInvitation };