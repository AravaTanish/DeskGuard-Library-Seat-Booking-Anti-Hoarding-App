import Session from "../models/Session.model.js";
import { io } from "../index.js";

export const expireSession = async (session) => {
  session.status = "ended";
  await session.save();
  const computer = session.computerId;
  computer.status = "free";
  computer.currentSession = null;
  await computer.save();
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
  }).populate("computerId");

  for (const session of expiredSessions) {
    await expireSession(session);
  }
};
