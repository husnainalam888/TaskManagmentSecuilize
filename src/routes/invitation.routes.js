
import express from "express";
import {
  sendInvitation,
  getInvitations,
  respondInvitation
} from "../controllers/invitation.controller";

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { invitationValidation, respondInvitationValidation } = require("../validations/invitation.validation");

const router = express.Router();

router.post("/", authMiddleware, validate(invitationValidation), sendInvitation);
router.get("/", authMiddleware, getInvitations);
router.post("/:id/respond", authMiddleware, validate(respondInvitationValidation), respondInvitation);


