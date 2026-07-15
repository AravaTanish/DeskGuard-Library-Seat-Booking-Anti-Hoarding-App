import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },

    studentRoll: {
      type: Number,
      required: true,
    },

    computerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Computer",
    },

    refreshToken: {
      type: String,
      select: false,
    },

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
    },

    warningSent: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "ended"],
      default: "active",
    },

    breaksCount: {
      type: Number,
    },

    breakStartTime: {
      type: Date,
    },

    breakEndTime: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
