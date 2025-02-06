import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignToUser,
  getCreatedTask,
  getAssignedTask,
  getStats,
} from "../controllers/task.controller.js";

import authMiddleware from "../middlewares/authentication/auth.middleware.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  assignToUserValidation,
  taskValidation,
  updateTaskValidation,
} from "../middlewares/validations/task.validation.js";
import { taskOwnershipMiddleware } from "../middlewares/authorization/task.ownership.middleware.js";
import { authorize } from "../middlewares/authorization/authorize.middleware.js";
import { PERMISSIONS } from "../constants/permissions.js";
import authenticateApp from "../middlewares/authentication/auth.app.middleware.js";
const router = express.Router();

router.get("/getStats", authenticateApp, getStats);
router.post(
  "/",
  authMiddleware,
  authorize(PERMISSIONS.CREATE_TASKS),
  validate(taskValidation),
  createTask
);
router.get("/", authMiddleware, getTasks);
router.get("/created", authMiddleware, getCreatedTask);
router.get("/assigned", authMiddleware, getAssignedTask);
router.get(
  "/:teamId/:id",
  authorize(PERMISSIONS.VIEW_TASKS),
  authMiddleware,
  getTaskById
);
router.put(
  "/assign",
  authMiddleware,
  validate(assignToUserValidation),
  taskOwnershipMiddleware,
  assignToUser
);
router.put(
  "/:id",
  authMiddleware,
  authorize(PERMISSIONS.EDIT_TASKS),
  taskOwnershipMiddleware,
  validate(updateTaskValidation),
  updateTask
);
router.delete(
  "/:id",
  authMiddleware,
  authorize(PERMISSIONS.DELETE_TASKS),
  taskOwnershipMiddleware,
  deleteTask
);

export default router;
