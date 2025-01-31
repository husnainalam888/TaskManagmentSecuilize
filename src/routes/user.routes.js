
import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { updateProfileValidation } from "../validations/user.validation";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, validate(updateProfileValidation), updateProfile);

export default router;