import Library from "../../models/Library.model.js";
import Admin from "../../models/Admin.model.js";
import Computer from "../../models/Computer.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";

export const addComputer = asyncHandler(async (req, res) => {
  const { name, libraryId } = req.body;
  if (!name?.trim()) {
    throw new AppError("Library name is required");
  }

  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }

  if (await Computer.exists({ libraryId, name })) {
    throw new AppError("Computer name already exists in this library", 400);
  }

  const computer = await Computer.create({ name, libraryId, adminId });

  return res.status(200).json({
    success: true,
    message: "Computer added successfully",
    computer,
  });
});

export const fetchComputers = asyncHandler(async (req, res) => {
  const { libraryId } = req.body;
  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }
  if (!(await Library.exists({ libraryId, adminId: id }))) {
    throw new AppError("Library does not exists", 404);
  }

  const computers = await Computer.find({ libraryId }).select(
    "-libraryId -adminId",
  );

  return res.status(200).json({
    success: true,
    message: "Computers fetched",
    computers,
  });
});

export const deleteComputer = asyncHnadler(async (req, res) => {
  const { libraryId } = req.body;
  const { computerId } = req.params;
  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }
  if (!(await Computer.exists({ _id: computerId, libraryId, adminId: id }))) {
    throw new AppError("Computer does not exists", 404);
  }

  await Computer.findByIdAndDelete(computerId);

  return res.status(200).json({
    success: true,
    message: "Computer deleted successfully",
  });
});
