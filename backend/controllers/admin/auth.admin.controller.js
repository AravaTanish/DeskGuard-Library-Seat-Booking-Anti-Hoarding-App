import jwt from "jsonwebtoken";
import validator from "validator";
import Admin from "../../models/Admin.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens.js";

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new AppError("Email required", 404);
  }
  if (!password) {
    throw new AppError("Password required", 404);
  }

  if (!validator.isEmail(email)) {
    throw new AppError("Invalid email", 401);
  }

  const existedAdmin = await Admin.exists({ email: email });
  if (existedAdmin) {
    throw new AppError("Email already exists, Please login", 409);
  }

  const hashedPassword = await hashPassword(password);

  const admin = await Admin.create({ email: email, password: hashedPassword });
  return res
    .status(200)
    .json({ success: true, message: "Admin created successfully" });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new AppError("Email required", 404);
  }
  if (!password) {
    throw new AppError("Password required", 404);
  }

  if (!validator.isEmail(email)) {
    throw new AppError("Invalid email", 401);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new AppError("Email does not exists, Please Sign in first", 404);
  }
  const hashedPassword = admin.password;
  const valid = await verifyPassword(hashedPassword, password);
  if (!valid) {
    throw new AppError("Incorrect Password, try again", 400);
  }

  const accessToken = generateAccessToken(admin._id, "admin");
  const refreshToken = generateRefreshToken(admin._id, "admin");

  admin.refreshToken = refreshToken;
  await admin.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
    maxAge: 100 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
    maxAge: 100 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: true,
    message: "Admin logged in successfully",
    email: email,
  });
});

export const me = async (req, res) => {
  try {
    const id = req.user.id;
    const admin = await Admin.findById(id).lean();
    if (!admin) {
      throw new AppError("Admin not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Admin details fetched",
      email: admin.email,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not logged in as admin role" });
  }
};

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError("Refresh token missing", 404);
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
  } catch {
    throw new AppError("Invalid or expired refresh token", 400);
  }

  const admin = await Admin.findById(decoded.id).select("+refreshToken");
  if (!admin) {
    throw new AppError("Admin not found", 404);
  }
  if (admin.refreshToken !== refreshToken) {
    throw new AppError("Invalid refresh token", 404);
  }

  const newAccessToken = generateAccessToken(admin._id, "admin");
  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 100 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "New access token generated successfully",
  });
});
