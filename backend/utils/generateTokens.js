import jwt from "jsonwebtoken";

export const generateAccessToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  });
};

export const generateRefreshToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  });
};
