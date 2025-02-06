import { Developer, App, AppCredential } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateApiKey,
  generateClientSecret,
} from "../utils/apiKeyGenerator.js";

const DeveloperService = {
  async register({ name, email, password }) {
    const existingDeveloper = await Developer.findOne({ where: { email } });
    if (existingDeveloper)
      throw new Error("Developer with this email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await Developer.create({ name, email, password: hashedPassword });
  },

  // Authenticate developer and return JWT
  async login({ email, password }) {
    const developer = await Developer.findOne({ where: { email } });
    if (!developer) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, developer.password);
    if (!isMatch) throw new Error("Invalid credentials");

    return jwt.sign({ developerId: developer.id }, process.env.DEV_JWT_SECRET, {
      expiresIn: "1h",
    });
  },

  // Get developer details
  async getProfile(developerId) {
    return await Developer.findByPk(developerId);
  },

  // Create a new app for the developer
  async createApp({ developerId, name, description }) {
    const app = await App.create({ developerId, name, description });
    const apiKey = generateApiKey();
    const clientSecret = generateClientSecret();

    await AppCredential.create({
      appId: app.id,
      apiKey,
      clientSecret,
    });

    return { app, apiKey, clientSecret };
  },

  // Get all apps of the developer
  async getApps(developerId) {
    return await App.findAll({ where: { developerId } });
  },

  // Get a specific app
  async getApp(developerId, appId) {
    return await App.findOne({ where: { id: appId, developerId } });
  },

  // Delete an app
  async deleteApp(developerId, appId) {
    const app = await App.findOne({ where: { id: appId, developerId } });
    if (!app) throw new Error("App not found");

    await app.destroy();
    return "App deleted successfully";
  },
};

export default DeveloperService;
