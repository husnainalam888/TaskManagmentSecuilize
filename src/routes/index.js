import express from "express";
import authRoutes from "../routes/auth.routes";
import userRoutes from "../routes/user.routes";
import teamRoutes from "../routes/team.routes";
import invitationRoutes from "../routes/invitation.routes";
import taskRoutes from "../routes/task.routes";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/teams", teamRoutes);
router.use("/invitations", invitationRoutes);
router.use("/tasks", taskRoutes);


export default router;

