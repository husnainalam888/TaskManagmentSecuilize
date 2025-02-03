import PermissionService from "../services/permission.service.js";

const PermissionController = {
  async getAllPermissions(req, res) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPermissionById(req, res) {
    try {
      const permission = await PermissionService.getPermissionById(
        req.params.id
      );
      if (!permission)
        return res.status(404).json({ message: "Permission not found" });
      res.json(permission);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createPermission(req, res) {
    try {
      const permission = await PermissionService.createPermission(req.body);
      res.status(201).json(permission);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updatePermission(req, res) {
    try {
      const updatedPermission = await PermissionService.updatePermission(
        req.params.id,
        req.body
      );
      if (!updatedPermission)
        return res.status(404).json({ message: "Permission not found" });
      res.json(updatedPermission);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deletePermission(req, res) {
    try {
      const deleted = await PermissionService.deletePermission(req.params.id);
      if (!deleted)
        return res.status(404).json({ message: "Permission not found" });
      res.json({ message: "Permission deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default PermissionController;
