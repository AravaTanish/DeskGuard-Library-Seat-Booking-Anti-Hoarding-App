import Session from "../models/Session.model.js";
import { io } from "../index.js";
import AppError from "./appError.js";

export const expireSession = async (session) => {
  const computer = session.computerId;
  computer.status = "free";
  computer.currentSession = null;
  computer.populate("adminId", "email");
  await computer.save();

  await session.deleteOne();

  res.clearCookie("sessionAccessToken");
  res.clearCookie("sessionRefreshToken");

  io.to(computer.adminId.email).emit("computer-status-updated", {
    computerId: computer._id,
    status: "free",
  });

  io.to(computer._id.toString()).emit("session-expired");
};

export const processExpiringSessions = async () => {
  const now = new Date();

  const warningSessions = await Session.find({
    status: "active",
    warningSent: false,
    endTime: {
      $lte: new Date(now.getTime() + 2 * 60 * 1000),
      $gt: now,
    },
  });

  console.log(`Found ${warningSessions.length} sessions nearing expiry.`);

  for (const session of warningSessions) {
    io.to(session.computerId.toString()).emit("session-expiring", {
      endTime: session.endTime,
    });
    session.warningSent = true;
    await session.save();
  }

  const expiredSessions = await Session.find({
    status: "active",
    endTime: {
      $lte: now,
    },
  }).populate("computerId", "adminId status currentSession");

  for (const session of expiredSessions) {
    try {
      await expireSession(session);
    } catch (error) {
      throw new AppError("Failed to end session", 400);
    }
  }
};
