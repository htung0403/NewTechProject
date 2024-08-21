import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

export default File;