import mongoose from "mongoose";

// task schema
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Task name is required!",
  },
  detail: {
    type: String,
  },
  status: {
    type: String,
    required: "Status is required!",
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: "Task start date is required!",
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    indexe: {
      unique: true,
    },
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    indexe: {
      unique: true,
    },
  },
  files: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "file",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
});

const task = mongoose.model("task", TaskSchema);

export default task;
