import mongoose from "mongoose";

const computerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library",
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    isActivated: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["free", "occupied", "break", "offline"],
      default: "free",
    },

    sessionCode: {
      type: String,
    },

    currentSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
    
    refreshToken: {
      type: String,
      select: false
    }
  },
  { timestamps: true },
);

computerSchema.index({ libraryId: 1, name: 1 }, { unique: true });

const Computer = mongoose.model("Computer", computerSchema);
export default Computer;
