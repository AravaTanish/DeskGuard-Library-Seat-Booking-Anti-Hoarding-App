import Computer from "./models/Computer.model.js";
import { generateCode } from "./utils/code.js";

export default function startSessionCodeRotate(io) {
  setInterval(
    async () => {
      const computers = await Computer.find({
        isActivated: true,
      });

      for (const computer of computers) {
        const code = generateCode(4);

        computer.sessionCode = code;
        computer.sessionCodeExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

        await computer.save();

        io.to(computer._id.toString()).emit("session-code-updated", {
          sessionCode: code,
          expiresAt: computer.sessionCodeExpiresAt,
        });
      }
    },
    5 * 60 * 1000,
  );
}
