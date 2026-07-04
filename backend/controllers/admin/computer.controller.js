import Library from "../../models/Library.model.js";
import Admin from "../../models/Admin.model.js";
import Computer from "../../models/Computer.model.js";
import ActivationCode from "../../models/ActivationCode.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import {
  generateActivationCode,
  hashActivationCode,
} from "../../utils/activationCode.js";

export const addComputer = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { libraryId } = req.params;
  if (!name?.trim()) {
    throw new AppError("Computer name is required", 400);
  }
  if (!libraryId) {
    throw new AppError("Library id is required", 400);
  }

  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }

  if (await Computer.exists({ libraryId, name })) {
    throw new AppError("Computer name already exists in this library", 400);
  }

  const computer = await Computer.create({ name, libraryId, adminId: id });

  return res.status(200).json({
    success: true,
    message: "Computer added successfully",
    computer,
  });
});

export const fetchComputers = asyncHandler(async (req, res) => {
  const { libraryId } = req.params;
  if (!libraryId) {
    throw new AppError("Library id is required", 400);
  }

  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }
  if (!(await Library.exists({ _id: libraryId, adminId: id }))) {
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

export const deleteComputer = asyncHandler(async (req, res) => {
  const { computerId, libraryId } = req.params;
  if (!libraryId) {
    throw new AppError("Library id is required", 400);
  }
  if (!computerId) {
    throw new AppError("Computer id is required", 400);
  }
  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }
  if (!(await Computer.exists({ _id: computerId, libraryId, adminId: id }))) {
    throw new AppError("Computer does not exists", 404);
  }
  await ActivationCode.deleteOne({ computerId });
  await Computer.findByIdAndDelete(computerId);

  return res.status(200).json({
    success: true,
    message: "Computer deleted successfully",
  });
});

export const getAvtivationCode = asyncHandler(async (req, res) => {
  const { computerId } = req.body;
  const { libraryId } = req.params;
  if (!libraryId) {
    throw new AppError("Library id is required", 400);
  }
  if (!computerId) {
    throw new AppError("Computer id is required", 400);
  }
  const id = req.user.id;
  const adminExists = await Admin.exists({ _id: id });
  if (!adminExists) {
    throw new AppError("Admin not found", 404);
  }

  const computer = await Computer.exists({
    _id: computerId,
    libraryId,
    adminId: id,
  });
  if (!computer) {
    throw new AppError("Computer does not exists", 404);
  }

  const code = generateActivationCode();
  const hashCode = hashActivationCode(code);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000); //30 mins
  const activationCode = await ActivationCode.findOne({ computerId });
  if (!oldCode) {
    activationCode = await ActivationCode.create({
      hashCode,
      computerId,
      expiresAt,
    });
  }
  activationCode.code = hashCode;
  activationCode.expiresAt = expiresAt;

  return res.status(200).json({
    success: true,
    message: "Activation code generated successfully",
    activationCode: code,
  });
});
