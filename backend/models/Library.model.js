import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true },
);

const Library = mongoose.model("Library", librarySchema);
export default Library;
