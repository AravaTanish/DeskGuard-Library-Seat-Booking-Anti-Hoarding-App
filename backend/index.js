import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnect.js";
import authAdminRoutes from "./routes/admin/auth.admin.routes.js";
import libararyRoutes from "./routes/admin/library.routes.js";
import computerRoutes from "./routes/admin/computer.routes.js";
import sessionRoutes from "./routes/client/session.routes.js";

import clientComputerRoutes from "./routes/client/clientComputer.routes.js";
import globalErrorMiddleware from "./middlewares/globalError.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// admin routes
app.use("/api/admin/auth", authAdminRoutes);
app.use("/api/admin/library", libararyRoutes);
app.use("/api/admin/computer/:libraryId", computerRoutes);

// client routes
app.use("/api/client/session/:computerId", sessionRoutes);
app.use("/api/client/computer", clientComputerRoutes);

app.use(globalErrorMiddleware);

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
