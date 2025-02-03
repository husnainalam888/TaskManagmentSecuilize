import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import router from "./src/routes/index.js";
import errorMiddleware from "./src/middlewares/errorHandling/error.middleware.js";
import sequelize, { setupAssociations } from "./src/database/db.js";
const app = express();
app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));
app.use((req, res, next) => {
  console.log(
    "Method : ",
    req.method,
    "Endpoint : ",
    req.url,
    "body : ",
    req.body
  );
  next();
});

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
    setupAssociations();
    sequelize.sync({ alter: true });
  })
  .then(() => console.log("✅ Database synced."))
  .catch((err) => console.error("❌ Database connection failed:", err));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Task Management API is running 🚀" });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
