import teamService from "../services/team.service.js";

export const createTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const team = await teamService.createTeam(req.body, userId);
    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const userId = req.user.id;
    const teams = await teamService.getTeams(userId);
    res.json(teams);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getMyTeams = async (req, res) => {
  try {
    const userId = req.user.id;
    const teams = await teamService.getMyTeams(userId);
    res.json(teams);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await teamService.getTeamById(id);
    res.json(team);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await teamService.deleteTeam(id);
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await teamService.addMember(
      id,
      req.body.userId,
      req.body.role
    );
    res.status(201).json({ message: "Member added successfully", teamMember });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const adminId = req.user.id;
    await teamService.removeMember(id, userId, adminId);
    res.json({ message: "Member removed successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getTeamsStats = async (req, res) => {
  try {
    const stats = await teamService.getTeamsStats();
    res.json({
      status: true,
      data: {
        totalTeams: stats?.length || 0,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
