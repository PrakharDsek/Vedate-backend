import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js"

const app = express();

// Middlewares
app.use(express.json()); // add this middleware before defining routes
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Vedates backend",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

export default app;
