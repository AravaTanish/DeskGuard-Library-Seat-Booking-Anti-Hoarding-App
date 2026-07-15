import jwt from "jsonwebtoken";
import Computer from "../../models/Computer.model.js";
import Session from "../../models/Session.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import { io } from "../../index.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens.js";

export const createSession = asyncHandler(async (req, res) => {
  const { computerId } = req.params;
  const { name, roll, code } = req.body;
  if (!computerId) {
    throw new AppError("Computer id is required", 400);
  }
  if (!name?.trim()) {
    throw new AppError("Student name is empty", 400);
  }
  if (!roll?.trim()) {
    throw new AppError("Roll number is empty", 400);
  }
  if (!code) {
    throw new AppError("Verification code is required", 400);
  }

  const computer = await Computer.findById(computerId).populate(
    "adminId",
    "email",
  );
  if (!computer) {
    throw new AppError("Computer does not exist", 404);
  }
  if (!computer.isActivated) {
    throw new AppError("The computer is not activated", 400);
  }
  if (computer.currentSession) {
    throw new AppError("This computer already occupied", 400);
  }
  if (computer.sessionCode !== code) {
    throw new AppError("Invalid verification code", 400);
  }

  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 3 * 60 * 1000);
  const session = await Session.create({
    studentName: name,
    studentRoll: roll,
    computerId: computerId,
    startTime: startTime,
    endTime: endTime,
  });

  const refreshToken = generateRefreshToken(session._id, "session");

  session.refreshToken = refreshToken;
  await session.save();

  computer.currentSession = session._id;
  computer.status = "occupied";
  await computer.save();

  const details = {
    name: name,
    roll: roll,
    computerName: computer.name,
    startTime: startTime,
  };

  io.to(computer._id.toString()).emit("session-created");
  io.to(computer.adminId.email).emit("computer-status-updated", {
    computerId: computer._id,
    status: "occupied",
  });

  return res.status(200).json({
    success: true,
    details,
    message: "Session created successfully",
  });
});

export const completeSession = asyncHandler(async (req, res) => {
  const computerId = req.user.id;
  if (!computerId) {
    throw new AppError("Computer id is required", 404);
  }

  const computer = await Computer.findById(computerId).populate({
    path: "currentSession",
    select: "+refreshToken",
  });
  if (!computer || !computer.currentSession) {
    throw new AppError("Computer or session not found", 404);
  }

  const session = computer.currentSession;
  const refreshToken = session.refreshToken;
  if (!refreshToken) {
    throw new AppError("Refresh token not found", 404);
  }
  const accessToken = generateAccessToken(session._id, "session");

  res.cookie("sessionRefreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
    maxAge: 100 * 24 * 60 * 60 * 1000,
  });

  res.cookie("sessionAccessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
    maxAge: 100 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    session,
    message: "Session started successfully",
  });
});

export const extendSession = async (req, res) => {
  const sessionId = req.user.id;
  if (!sessionId) {
    throw new AppError("Session id is required", 404);
  }

  const session = await Session.findById(sessionId);
  if (!session) {
    throw new AppError("Session not found", 404);
  }

  session.endTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
  session.warningSent = false;
  await session.save();

  return res.status(200).json({
    success: true,
    session,
    message: "Session extended successfully",
  });
};

export const me = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const session = await Session.findById(id);
  if (!session) {
    throw new AppError("Session not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Session details fetched",
    session: session,
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.sessionRefreshToken;
  if (!refreshToken) {
    throw new AppError("Refresh token missing", 404);
  }

  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
  } catch {
    throw new AppError("Invalid or expired refresh token", 400);
  }

  const session = await Session.findById(decoded.id).select("+refreshToken");
  if (!session) {
    throw new AppError("Session not found", 404);
  }
  if (session.refreshToken !== refreshToken) {
    throw new AppError("Invalid refresh token", 404);
  }

  const newAccessToken = generateAccessToken(session._id, "session");
  res.cookie("sessionAccessToken", newAccessToken, {
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
