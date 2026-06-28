import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnect.js";
import authAdminRoutes from "./routes/admin/auth.admin.routes.js";

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

app.use("/api/admin/auth", authAdminRoutes);

app.use(globalErrorMiddleware);

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
