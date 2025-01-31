import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import router from "./src/routes/index.js";
import errorMiddleware from "./src/middlewares/error.middleware.js";
import sequelize from "./src/database/db.js";
const app = express();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use("/api", router);

app.use(errorMiddleware);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully.");
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log("✅ Database synced."))
  .catch((err) => console.error("❌ Database connection failed:", err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Task Management API is running 🚀" });
});

export default app;
