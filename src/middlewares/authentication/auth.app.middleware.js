import { App, Developer, AppCredential } from "../../models/index.js";
import crypto from "crypto";

const authenticateApp = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    const clientSecret = req.headers["x-client-secret"];

    if (!apiKey || !clientSecret) {
      return res
        .status(401)
        .json({ message: "API key and Client Secret are required" });
    }

    const credentials = await AppCredential.findOne({ where: { apiKey } });

    if (!credentials) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    const isSecretValid = crypto.timingSafeEqual(
      Buffer.from(clientSecret),
      Buffer.from(credentials.clientSecret)
    );

    if (!isSecretValid) {
      return res.status(401).json({ message: "Invalid Client Secret" });
    }

    const app = await App.findByPk(credentials.appId);

    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }

    const developer = await Developer.findByPk(app.developerId);

    if (!developer) {
      return res.status(404).json({ message: "Developer not found" });
    }

    req.app = app;
    req.developer = developer;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authenticateApp;
