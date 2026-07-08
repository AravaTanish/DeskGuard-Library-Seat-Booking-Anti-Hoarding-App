import ActivationCode from "../../models/ActivationCode.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import Computer from "../../models/Computer.model.js";
import jwt from "jsonwebtoken";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/generateTokens.js";


export const verifyActivationCode = asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (code.length < 12) {
        throw new AppError("Enter full activation code", 400);
    }
    const activationCode = await ActivationCode.findOne({ code }).populate({
        path: "computerId",
        select:"_id isActivated +refreshToken",
    });
    if (!activationCode) {
        throw new AppError("Invalid activation code", 400);
    }
    // if(activationCode.computerId.isActivated === true){
    //     throw new AppError("Computer already activated", 400);
    // }

    const computerId = activationCode.computerId._id;

    const accessToken = generateAccessToken(computerId, "computer");
    const refreshToken = generateRefreshToken(computerId, "computer");

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
    id: computer._id,
  });
});

export const refresh = asyncHandler(async (req, res) => {
    const refreshToken = res.cookie.refreshToken;
    if (!refreshToken) {
        throw new AppError("refreshToken missing", 404);
    }

    let decode;
    try {
        decode = jwt.verify(refreshToken, process.JWT_REFRESH_TOKEN_SECRET);
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
    res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 100 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success: true,
        message: "New access token generated successfully",
    })
});
