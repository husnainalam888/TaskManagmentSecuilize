import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  deleteTeam,
  addMember,
  removeMember,
  getMyTeams,
  getTeamsStats,
} from "../controllers/team.controller.js";

import authMiddleware from "../middlewares/authentication/auth.middleware.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  teamValidation,
  addMemberValidation,
} from "../middlewares/validations/team.validation.js";
import { authorize } from "../middlewares/authorization/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permissions.js";
import authenticateApp from "../middlewares/authentication/auth.app.middleware.js";

const router = express.Router();

router.get("/getStats", authenticateApp, getTeamsStats);

router.post("/", authMiddleware, validate(teamValidation), createTeam);
router.get("/", authMiddleware, getTeams);
router.get("/me", authMiddleware, getMyTeams);
router.get(
  "/:teamdId/:id",
  authMiddleware,
  authorize(PERMISSIONS.VIEW_TEAM),
  getTeamById
);
router.delete(
  "/:id",
  authMiddleware,
  authorize(PERMISSIONS.DELETE_TEAM),
  deleteTeam
);
router.post(
  "/:id/members",
  authMiddleware,
  authorize(PERMISSIONS.ADD_TEAM_MEMBERS),
  validate(addMemberValidation),
  addMember
);
router.delete(
  "/:id/members/:userId",
  authMiddleware,
  authorize(PERMISSIONS.REMOVE_TEAM_MEMBERS),
  removeMember
);

export default router;
