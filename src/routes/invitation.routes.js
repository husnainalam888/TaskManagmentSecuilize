import express from "express";
import {
  sendInvitation,
  getInvitations,
  respondInvitation,
} from "../controllers/invitation.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  invitationValidation,
  respondInvitationValidation,
} from "../validations/invitation.validation.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(invitationValidation),
  sendInvitation
);
router.get("/", authMiddleware, getInvitations);
router.post(
  "/:id/respond",
  authMiddleware,
  validate(respondInvitationValidation),
  respondInvitation
);

export default router;
