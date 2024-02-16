import mongoose from "mongoose";

// dynamic task status schema
const TaskColumnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Column name is required",
  },
  description: {
    type: String,
    required: "Column description is required",
  },
});

const TaskColumn = mongoose.model("taskColumn", TaskColumnSchema);

export default TaskColumn;
