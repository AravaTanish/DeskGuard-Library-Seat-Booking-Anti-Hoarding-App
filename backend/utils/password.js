import argon2 from "argon2";
import AppError from "../utils/appError.js";

export const hashPassword = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    throw new AppError(error.message, error.status);
  }
};

export const verifyPassword = async (hashedPassword, password) => {
  try {
    const valid = await argon2.verify(hashedPassword, password);
    return valid;
  } catch (error) {
    throw new AppError(error.message, error.status);
  }
};
