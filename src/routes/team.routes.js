import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  deleteTeam,
  addMember,
  removeMember,
} from "../controllers/team.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  teamValidation,
  addMemberValidation,
} from "../validations/team.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validate(teamValidation), createTeam);
router.get("/", authMiddleware, getTeams);
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
