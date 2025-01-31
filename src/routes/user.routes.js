import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { updateProfileValidation } from "../validations/user.validation.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put(
  "/profile",
  authMiddleware,
  validate(updateProfileValidation),
  updateProfile
);

export default router;
