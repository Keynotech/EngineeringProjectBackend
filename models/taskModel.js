import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  status: Boolean,
});

var TaskModel = mongoose.model("TaskModel", taskSchema);
export default TaskModel;
