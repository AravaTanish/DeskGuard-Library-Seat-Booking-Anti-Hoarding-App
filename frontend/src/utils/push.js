import computerApi from "../api/computerAxios.js";

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser doesn't support notifications.");
    return false;
  }
  if (Notification.permission === "granted") {
    return true;
  }
  if (Notification.permission === "denied") {
    console.log("Notification permission denied.");
    return false;
  }
  const permission = await Notification.requestPermission();

  return permission === "granted";
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;

  const { data } = await computerApi.get("/client/computer/vapid-public-key");

  const publicKey = urlBase64ToUint8Array(data.publicKey);

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicKey,
    });
  }

  await computerApi.post("/client/computer/push-subscription", {
    subscription,
  });

  console.log("Push subscription saved");

  return subscription;
}
