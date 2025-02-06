import express from "express";
import DeveloperController from "../controllers/developer.controller.js";
import { authenticateDeveloper } from "../middlewares/authentication/auth.developer.middleware.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  createAppSchema,
  loginSchema,
  registerSchema,
} from "../middlewares/validations/developer.validation.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  DeveloperController.register
);
router.post("/login", validate(loginSchema), DeveloperController.login);

router.get("/profile", authenticateDeveloper, DeveloperController.getProfile);

router.get("/apps", authenticateDeveloper, DeveloperController.getApps);
router.post(
  "/apps",
  validate(createAppSchema),
  authenticateDeveloper,
  DeveloperController.createApp
);
router.get("/apps/:appId", authenticateDeveloper, DeveloperController.getApp);

router.delete(
  "/apps/:appId",
  authenticateDeveloper,
  DeveloperController.deleteApp
);

export default router;
