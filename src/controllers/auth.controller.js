import { authService } from "../services/auth.service.js";

const register = async (req, res) => {
  try {
    const user = await authService.register(
      req.body.name,
      req.body.email,
      req.body.password
    );
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await authService.login(req.body.email, req.body.password);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(error.statusCode || 401).json({ message: error.message });
  }
};

export { register, login };
