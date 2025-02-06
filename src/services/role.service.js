import { PERMISSIONS } from "../constants/permissions.js";
import { ROLES } from "../constants/roles.js";
import { Permission, Role } from "../models/index.js";
import PermissionService from "./permission.service.js";

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
  async assignDefaultRoleToUser(teamId, userId) {
    const [memberRole, created] = await Role.findOrCreate({
      where: { name: ROLES.MEMBER },
    });
    const permissions = await PermissionService.getDefaultMemberPermissions();
    await memberRole.addPermissions(permissions);
    return memberRole.id;
  },
};

export default RoleService;
