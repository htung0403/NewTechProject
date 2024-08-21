import File from '../models/file.model.js';
import { errorHandler } from '../utils/error.js';

export const uploadFile = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to upload files'));
  }

  const { fileName, fileUrl, fileType, folder } = req.body;

  if (!fileName || !fileUrl || !fileType || !folder) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const newFile = new File({
    userId: req.user.id,
    fileName,
    fileUrl,
    fileType,
    folder,
  });

  try {
    const savedFile = await newFile.save();
    res.status(201).json(savedFile);
  } catch (error) {
    next(error);
  }
};

export const getFiles = async (req, res, next) => {
    try {
      const files = await File.find();
      res.status(200).json(files);
    } catch (error) {
      next(error);
    }
};