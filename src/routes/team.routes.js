import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  deleteTeam,
  addMember,
  removeMember,
  getMyTeams,
} from "../controllers/team.controller.js";

import authMiddleware from "../middlewares/authentication/auth.middleware.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  teamValidation,
  addMemberValidation,
} from "../middlewares/validations/team.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validate(teamValidation), createTeam);
router.get("/", authMiddleware, getTeams);
router.get("/me", authMiddleware, getMyTeams);
router.get("/:id", authMiddleware, getTeamById);
router.delete("/:id", authMiddleware, deleteTeam);
router.post(
  "/:id/members",
  authMiddleware,
  validate(addMemberValidation),
  addMember
);
router.delete("/:id/members/:userId", authMiddleware, removeMember);

export default router;
