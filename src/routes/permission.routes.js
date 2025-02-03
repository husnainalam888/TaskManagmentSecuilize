import express from "express";
import PermissionController from "../controllers/permission.controller.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  createPermissionValidation,
  updatePermissionValidation,
} from "../middlewares/validations/permission.validation.js";

const router = express.Router();

router.get("/", PermissionController.getAllPermissions);
router.get("/:id", PermissionController.getPermissionById);
router.post(
  "/",
  validate(createPermissionValidation),
  PermissionController.createPermission
);
router.put(
  "/:id",
  validate(updatePermissionValidation),
  PermissionController.updatePermission
);
router.delete("/:id", PermissionController.deletePermission);

export default router;
