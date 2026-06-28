import mongoose from "mongoose";

const computerSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },

    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["free", "occupied", "break"],
      default: "free",
    },

    currentSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
    }
  },
  { timestamps: true },
);

const Computer = mongoose.model("Computer", computerSchema);
export default Computer;
