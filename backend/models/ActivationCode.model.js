import mongoose from "mongoose";

const activationCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },

    computerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Computer",
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);

const ActivationCode = mongoose.model("ActivationCode", activationCodeSchema);
export default ActivationCode;
