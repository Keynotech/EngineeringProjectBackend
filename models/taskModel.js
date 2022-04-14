import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
  title: String,
  priopity: Number,
  description: String,
  attachments: String,
  tags: String,
  status: Boolean,
  updated: { type: Date, default: Date.now },
})

var TaskModel = mongoose.model("TaskModel", taskSchema)
export default TaskModel
