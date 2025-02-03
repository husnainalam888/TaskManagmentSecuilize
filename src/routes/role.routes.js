import express from "express";
import RoleController from "../controllers/role.controller.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  createRoleValidation,
  updateRoleValidation,
} from "../middlewares/validations/role.validation.js";

const router = express.Router();

router.get("/", RoleController.getAllRoles);
router.get("/:id", RoleController.getRoleById);
router.post("/", validate(createRoleValidation), RoleController.createRole);
router.put("/:id", validate(updateRoleValidation), RoleController.updateRole);
router.delete("/:id", RoleController.deleteRole);

export default router;
