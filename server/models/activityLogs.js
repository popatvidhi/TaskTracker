import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  udpatedAt: {
    type: Date,
    default: Date.now,
  },
});

const activityLog = mongoose.model("activityLog", ActivityLogSchema);

export default activityLog;
