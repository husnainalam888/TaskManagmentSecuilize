import DeveloperService from "../services/developer.service.js";
const DeveloperController = {
  async register(req, res) {
    try {
      const developer = await DeveloperService.register(req.body);
      res
        .status(201)
        .json({ message: "Developer registered successfully", developer });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const token = await DeveloperService.login(req.body);
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  async getProfile(req, res) {
    try {
      const developer = await DeveloperService.getProfile(req.developer.id);
      res.json(developer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createApp(req, res) {
    try {
      const { name, description } = req.body;
      const result = await DeveloperService.createApp({
        developerId: req.developer.id,
        name,
        description,
      });
      res.status(201).json({ message: "App created successfully", ...result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getApps(req, res) {
    try {
      const apps = await DeveloperService.getApps(req.developer.id);
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getApp(req, res) {
    try {
      const app = await DeveloperService.getApp(
        req.developer.id,
        req.params.appId
      );
      if (!app) return res.status(404).json({ message: "App not found" });
      res.json(app);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteApp(req, res) {
    try {
      const message = await DeveloperService.deleteApp(
        req.developer.id,
        req.params.appId
      );
      res.json({ message });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default DeveloperController;
