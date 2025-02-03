import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import teamRoutes from "./team.routes.js";
import taskRoutes from "./task.routes.js";
import invitationRoutes from "./invitation.routes.js";
import roleRoutes from "./role.routes.js";
import permissionRoutes from "./permission.routes.js";
const router = express.Router();
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/invitations", invitationRoutes);
router.use("/tasks", taskRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);

export default router;
