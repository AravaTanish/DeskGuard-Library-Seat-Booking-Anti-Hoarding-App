import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    computerIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Computer",
      },
    ],
  },
  { timestamps: true },
);

const Library = mongoose.model("Library", librarySchema);
export default Library;
