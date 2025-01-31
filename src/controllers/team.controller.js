import * as teamService from "../services/team.service.js";

export const createTeam = async (req, res) => {
  try {
    const team = await teamService.createTeam(req.body);
    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await teamService.getTeams();
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
    await teamService.removeMember(id, userId);
    res.json({ message: "Member removed successfully" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
