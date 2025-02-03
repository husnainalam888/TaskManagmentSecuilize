import RoleService from "../services/role.service.js";

const RoleController = {
  async getAllRoles(req, res) {
    try {
      const roles = await RoleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getRoleById(req, res) {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createRole(req, res) {
    try {
      const role = await RoleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateRole(req, res) {
    try {
      const updatedRole = await RoleService.updateRole(req.params.id, req.body);
      if (!updatedRole)
        return res.status(404).json({ message: "Role not found" });
      res.json(updatedRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteRole(req, res) {
    try {
      const deleted = await RoleService.deleteRole(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Role not found" });
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default RoleController;
