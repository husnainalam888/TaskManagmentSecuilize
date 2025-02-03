import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

class AuthService {
  async register(name, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      return {
        ...user.get({ plain: true }),
        access_token: token,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
      );
      return { ...user.get({ plain: true }), access_token: token };
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
