import express from "express";
import { register, login, getStats } from "../controllers/auth.controller.js";
import validate from "../middlewares/validations/validate.middleware.js";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validations/auth.validation.js";
import authenticateApp from "../middlewares/authentication/auth.app.middleware.js";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);
router.get("/getStats", authenticateApp, getStats);

export default router;
