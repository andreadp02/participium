import express from "express";
import cors from "cors";
import path from "path";
import authRouter from "./routes/authRouter";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cookieParser from "cookie-parser";
import reportRouter from "./routes/reportRouter";
import userRouter from "./routes/userRouter";
import { openApiValidator } from "./middlewares/validatorMiddleware";

const app = express();

const isDocker = process.env.IS_DOCKER === "true";
export const swaggerPath = isDocker
  ? "/app/doc/OpenAPI_swagger.yml"
  : path.join(__dirname, "../../doc/OpenAPI_swagger.yml");

const swaggerDocument = YAML.load(swaggerPath);

app.use(express.json());
app.use(openApiValidator);

// Configure CORS to allow credentials and frontend origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRouter);
app.use("/api", reportRouter);
app.use("/api/users", userRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// OpenAPI validation error handler
app.use((err: any, _req: any, res: any, next: any) => {
  // Check if it's an OpenAPI validator error
  if (err.status && err.errors && Array.isArray(err.errors)) {
    // OpenAPI validation error
    return res.status(400).json({
      error: "Validation Error",
      message: err.message || "Request validation failed",
      details: err.errors,
    });
  }
  next(err);
});

// Generic error handlers
app.use((err: any, _req: any, res: any, _next: any) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res
      .status(400)
      .json({ error: "Validation Error", message: "Invalid JSON" });
  }
  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
});

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

export default app;
