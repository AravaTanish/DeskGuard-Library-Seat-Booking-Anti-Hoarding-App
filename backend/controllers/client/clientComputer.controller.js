import ActivationCode from "../../models/ActivationCode.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import Computer from "../../models/Computer.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/generateTokens.js";
import { response } from "express";

export const verifyActivationCode = asyncHandler(async (req, res) => {
    const { code } = req.body;
    if (code.length < 12) {
        throw new AppError("Enter full activation code", 400);
    }
    const activationCode = await ActivationCode.findOne({ code });
    if (!activationCode) {
        throw new AppError("Invalid activation code", 400);
    }
    const computerId = activationCode?.computerId;
    if (!computerId) {
        throw new AppError("ComputerId not found", 400);
    }
    const computer = await Computer.findById({ computerId });
    computer.isActivated = true;
    await computer.save();

    const accessToken = generateAccessToken(computerId);
    const refreshToken = generateRefreshToken(computerId);

    res.cookie("computerAccessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        path: "/",
        maxAge: 15 * 60 * 1000,
    });
    res.cookie("computerRefreshToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    console.log("Activation code found:", activationCode);
    return res.status(200).json({
        success: true,
        message: "Activation code is valid",
    });
});
