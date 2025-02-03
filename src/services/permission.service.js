import { Permission } from "../models/index.js";

const PermissionService = {
  async getAllPermissions() {
    return await Permission.findAll();
  },

  async getPermissionById(id) {
    return await Permission.findByPk(id);
  },

  async createPermission(data) {
    return await Permission.create(data);
  },

  async updatePermission(id, data) {
    const permission = await Permission.findByPk(id);
    if (!permission) return null;
    await permission.update(data);
    return permission;
  },

  async deletePermission(id) {
    const permission = await Permission.findByPk(id);
    if (!permission) return null;
    await permission.destroy();
    return true;
  },
};

export default PermissionService;
