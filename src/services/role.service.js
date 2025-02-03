import { Role } from "../models/index.js";

const RoleService = {
  async getAllRoles() {
    return await Role.findAll();
  },

  async getRoleById(id) {
    return await Role.findByPk(id);
  },

  async createRole(data) {
    return await Role.create(data);
  },

  async updateRole(id, data) {
    const role = await Role.findByPk(id);
    if (!role) return null;
    await role.update(data);
    return role;
  },

  async deleteRole(id) {
    const role = await Role.findByPk(id);
    if (!role) return null;
    await role.destroy();
    return true;
  },
};

export default RoleService;
