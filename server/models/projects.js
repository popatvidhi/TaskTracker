import mongoose from "mongoose";

// project schema
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Project name is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: "Project create date is required",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    indexe: {
      unique: true,
    },
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  status: {
    type: String,
    enum: ["IN PROGRESS", "COMPLETED"],
    default: "IN PROGRESS",
  },
  theme: {
    type: String,
    default: "#B71C1C",
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "file",
    },
  ],
  taskColumnsDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "taskColumn",
    },
  ],
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
});

const project = mongoose.model("project", ProjectSchema);

export default project;
