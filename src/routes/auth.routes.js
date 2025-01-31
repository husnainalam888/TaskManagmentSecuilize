
import express from "express";
import { register, login } from "../controllers/auth.controller";
import validate from "../middlewares/validate.middleware";
import { registerValidation, loginValidation } from "../validations/auth.validation";

const router = express.Router();

router.post("/register", validate(registerValidation), register);
router.post("/login", validate(loginValidation), login);

module.exports = router;
