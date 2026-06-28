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

    startTime: {
      type: Date,
      required: true,
    },

    endTime: {
      type: Date,
    },

    breaksCount: {
      type: Number,
    },

    breakStartTime: {
      type: Date,
      required: true,
    },

    breakEndTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
