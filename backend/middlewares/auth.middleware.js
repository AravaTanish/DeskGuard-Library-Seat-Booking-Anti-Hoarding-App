import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw new AppError("Unauthorized", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid or expired access token", 401);
  }
};

export default authMiddleware;
