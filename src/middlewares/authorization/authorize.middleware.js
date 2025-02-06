import { TeamMember, Role, Permission, Team } from "../../models/index.js";

export const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;
      const teamId = req?.params?.teamId || req?.body?.teamId;

      if (!userId || !teamId) {
        return res
          .status(400)
          .json({ message: "User ID and Team ID are required" });
      }
      const isAdmin = await Team.findOne({
        where: { id: teamId, adminId: userId },
      });
      console.log("isAdmin", isAdmin, userId, teamId);
      if (isAdmin) {
        return next();
      }
      const teamMembership = await TeamMember.findOne({
        where: { userId, teamId },
        include: {
          model: Role,
          as: "role",
          include: {
            model: Permission,
            as: "permissions",
            through: { attributes: [] },
            where: { name: requiredPermission },
          },
        },
      });

      if (
        !teamMembership ||
        !teamMembership.role ||
        !teamMembership.role.Permissions.length
      ) {
        return res
          .status(403)
          .json({ message: "Access Denied: Insufficient permissions" });
      }

      next();
    } catch (error) {
      console.error("Authorization Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
