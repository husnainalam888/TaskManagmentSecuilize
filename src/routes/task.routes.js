import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  taskValidation,
  updateTaskValidation,
} from "../validations/task.validation.js";
const router = express.Router();

router.post("/", authMiddleware, validate(taskValidation), createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.put("/:id", authMiddleware, validate(updateTaskValidation), updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
