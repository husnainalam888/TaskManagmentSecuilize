import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller";

const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { taskValidation, updateTaskValidation } = require("../validations/task.validation");

const router = express.Router();

router.post("/", authMiddleware, validate(taskValidation), createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
router.put("/:id", authMiddleware, validate(updateTaskValidation), updateTask);
router.delete("/:id", authMiddleware, deleteTask);


export default router;