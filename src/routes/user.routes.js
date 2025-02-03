import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/authentication/auth.middleware.js";
import validate from "../middlewares/validations/validate.middleware.js";
import { updateProfileValidation } from "../middlewares/validations/user.validation.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put(
  "/profile",
  authMiddleware,
  validate(updateProfileValidation),
  updateProfile
);

export default router;
