import mongoose from "mongoose";

// file schema
const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "File name is required",
  },
  url: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
    required: true,
  },
});

const file = mongoose.model("file", FileSchema);

export default file;
