import PushSubscription from "../models/PushSubscription.model.js";
import webPush from "../config/vapid.js";

export const sendPushNotification = async (
  computerId,
  title,
  body,
  url = "/computer/home",
) => {
  const pushSubscription = await PushSubscription.findOne({
    computer: computerId,
  });

  if (!pushSubscription) return;

  const payload = JSON.stringify({
    title,
    body,
    url,
  });

  try {
    await webPush.sendNotification(pushSubscription.subscription, payload);
  } catch (error) {
    console.error("Push notification failed:", error);

    // Subscription expired
    if (error.statusCode === 404 || error.statusCode === 410) {
      await PushSubscription.deleteOne({
        _id: pushSubscription._id,
      });
    }
  }
};
