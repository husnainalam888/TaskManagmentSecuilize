import express from "express";
import {
  sendInvitation,
  getInvitations,
  respondInvitation,
} from "../controllers/invitation.controller.js";

import authMiddleware from "../middlewares/authentication/auth.middleware.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  invitationValidation,
  respondInvitationValidation,
} from "../middlewares/validations/invitation.validation.js";
import { PERMISSIONS } from "../constants/permissions.js";
import { authorize } from "../middlewares/authorization/authorize.middleware.js";
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorize(PERMISSIONS.CREATE_INVITATIONS),
  validate(invitationValidation),
  sendInvitation
);
router.get("/", authMiddleware, getInvitations);
router.put(
  "/:id/respond",
  authMiddleware,
  validate(respondInvitationValidation),
  respondInvitation
);

export default router;
