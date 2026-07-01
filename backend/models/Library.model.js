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

    no_of_computers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Library = mongoose.model("Library", librarySchema);
export default Library;
