import express from "express";
import TeamMemberController from "../controllers/teamMember.controller.js";
import validate from "../middlewares/validations/validate.middleware.js";
import { assignRoleValidation } from "../middlewares/validations/teamMember.validation.js";
const router = express.Router();

router.put(
  "/assign-role",
  validate(assignRoleValidation),
  TeamMemberController.assignRole
);

export default router;
