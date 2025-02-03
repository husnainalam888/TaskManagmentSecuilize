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
} from "../controllers/task.controller.js";

import authMiddleware from "../middlewares/authentication/auth.middleware.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  assignToUserValidation,
  taskValidation,
  updateTaskValidation,
} from "../middlewares/validations/task.validation.js";
import { taskOwnershipMiddleware } from "../middlewares/authorization/task.ownership.middleware.js";
const router = express.Router();

router.post("/", authMiddleware, validate(taskValidation), createTask);
router.get("/", authMiddleware, getTasks);
router.get("/created", authMiddleware, getCreatedTask);
router.get("/assigned", authMiddleware, getAssignedTask);
router.get("/:id", authMiddleware, getTaskById);
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
  taskOwnershipMiddleware,
  validate(updateTaskValidation),
  updateTask
);
router.delete("/:id", authMiddleware, taskOwnershipMiddleware, deleteTask);

export default router;
