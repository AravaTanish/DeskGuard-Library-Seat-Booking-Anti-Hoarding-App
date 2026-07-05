import Library from "../../models/Library.model.js";
import Admin from "../../models/Admin.model.js";
import Computer from "../../models/Computer.model.js";
import ActivationCode from "../../models/ActivationCode.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";

export const createLibrary = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name?.trim()) {
    throw new AppError("Library name is required");
  }
  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }
  const library = await Library.create({ name: name, adminId: id });
  return res.status(200).json({
    success: true,
    message: "Library created successfully",
    library: library,
  });
});

export const fetchLibraries = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }

  const libraries = await Library.find({ adminId: id }).select(
    "name no_of_computers",
  );

  return res.status(200).json({
    success: true,
    message: "Libraries fetched",
    libraries: libraries,
  });
});

export const deleteLibraries = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }

  const { libraryId } = req.params;
  const library = await Library.exists({ _id: libraryId, adminId: id });
  if (!library) {
    throw new AppError("Library not found", 404);
  }

  const computers = await Computer.find({ libraryId }).select("_id");
  if (computers) {
    const computerIds = computers.map((computer) => computer._id);
    if (computerIds) {
      await ActivationCode.deleteMany({
        computerId: { $in: computerIds },
      });
    }
  }

  await Computer.deleteMany({ libraryId: libraryId });
  await Library.findByIdAndDelete(libraryId);

  return res.status(200).json({
    success: true,
    message: "Libray and computers deleted successfully",
  });
});
