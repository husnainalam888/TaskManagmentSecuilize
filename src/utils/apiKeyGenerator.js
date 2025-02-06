import crypto from "crypto";

export const generateApiKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const generateClientSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};
