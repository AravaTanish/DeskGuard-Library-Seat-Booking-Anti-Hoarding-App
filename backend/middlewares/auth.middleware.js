import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = (role) => {
  return (req, res, next) => {
    try {
      let token;
      const secret = process.env.JWT_ACCESS_TOKEN_SECRET;

      if (role === "admin") {
        token = req.cookies.accessToken;
      } else if (role === "session") {
        token = req.cookies.sessionAccessToken;
      } else if (role === "computer") {
        token = req.cookies.computerAccessToken;
      } else {
        throw new AppError("Invalid auth role", 500);
      }

      if (!token) {
        throw new AppError("Unauthorized: No token provided", 401);
      }

      const decoded = jwt.verify(token, secret);

      if (decoded.role !== role) {
        throw new AppError("Unauthorized: Invalid token", 401);
      }

      req.user = {
        id: decoded.id,
        role,
      };

      next();
    } catch (err) {
      if (err instanceof AppError) {
        throw err;
      }
      
      if (err.name === "TokenExpiredError") {
        throw new AppError("Access token expired", 401);
      }

      throw new AppError("Invalid access token", 401);
    }
  };
};

export default authMiddleware;
