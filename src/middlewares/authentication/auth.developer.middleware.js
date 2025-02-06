import { Developer, App } from "../../models/index.js";
import jwt from "jsonwebtoken";
const TAG = "AuthMiddleware";
export const authenticateDeveloper = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.DEV_JWT_SECRET);
    const developer = await Developer.findByPk(decoded.developerId);
    if (!developer)
      return res.status(401).json({ message: "Developer not found" });

    req.developer = developer;
    next();
  } catch (error) {
    console.log(TAG, "authenticateDeveloper", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
