import jwt from "jsonwebtoken";
import Computer from "../../models/Computer.model.js";
import ActivationCode from "../../models/ActivationCode.model.js";
import PushSubscription from "../../models/PushSubscription.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import { generateCode } from "../../utils/code.js";
import webPush from "../../config/vapid.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateTokens.js";

export const verifyActivationCode = asyncHandler(async (req, res) => {
  const { code } = req.body;
  if (code.length < 12) {
    throw new AppError("Enter full activation code", 400);
  }
  const activationCode = await ActivationCode.findOne({
    code,
    expiresAt: { $gt: new Date() },
  }).populate({
    path: "computerId",
    select:
      "_id name isActivated sessionCode sessionCodeExpiresAt +refreshToken",
  });
  if (!activationCode) {
    throw new AppError("Invalid or expired activation code", 400);
  }

  const computerId = activationCode.computerId._id;
  const sessionCode = generateCode(4);
  const accessToken = generateAccessToken(computerId, "computer");
  const refreshToken = generateRefreshToken(computerId, "computer");

  activationCode.computerId.sessionCode = sessionCode;
  activationCode.computerId.sessionCodeExpiresAt = new Date(
    Date.now() + 5 * 60 * 1000,
  );
  activationCode.computerId.isActivated = true;
  activationCode.computerId.refreshToken = refreshToken;
  await activationCode.computerId.save();

  res.cookie("computerAccessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
    maxAge: 100 * 24 * 60 * 60 * 1000,
  });
  res.cookie("computerRefreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
    maxAge: 100 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    computer: activationCode.computerId,
    message: "Activation code is valid",
  });
});

export const me = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const computer = await Computer.findById(id);
  if (!computer) {
    throw new AppError("Computer not found", 404);
  }
  return res.status(200).json({
    success: true,
    message: "Computer details fetched",
    computer: computer,
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.computerRefreshToken;
  if (!refreshToken) {
    throw new AppError("refreshToken missing", 404);
  }

  let decode;
  try {
    decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new AppError("Invalid or expired refresh token", 400);
  }

  const computer = await Computer.findById(decode.id).select("+refreshToken");

  if (!computer) {
    throw new AppError("computer not found", 404);
  }

  if (computer.refreshToken !== refreshToken) {
    throw new AppError("invalid refreshToken", 404);
  }

  const newAccessToken = generateAccessToken(computer._id, "computer");
  res.cookie("computerAccessToken", newAccessToken, {
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

export const getVapidPublicKey = (req, res) => {
  res.json({
    success: true,
    publicKey: process.env.VAPID_PUBLIC_KEY,
  });
};

export const pushSubscription = asyncHandler(async (req, res) => {
  const computerId = req.user.id;

  await PushSubscription.findOneAndUpdate(
    { computer: computerId },
    { subscription: req.body.subscription },
    { upsert: true, returnDocument: "after" },
  );

  res.json({
    success: true,
  });
});
