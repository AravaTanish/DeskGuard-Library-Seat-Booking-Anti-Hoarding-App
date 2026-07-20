import mongoose from "mongoose";

const pushSubscriptionSchema = new mongoose.Schema(
  {
    computer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Computer",
      required: true,
      unique: true,
    },

    subscription: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("PushSubscription", pushSubscriptionSchema);
