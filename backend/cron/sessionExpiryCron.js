import cron from "node-cron";
import { processExpiringSessions } from "../utils/sessionExpiry.js";

cron.schedule("*/30 * * * * *", async () => {
    console.log("Running session expiry cron job...");
    await processExpiringSessions();
    console.log("Session expiry cron job completed.");
});