import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
  title: String,
  priority: Number,
  description: String,
  attachments: String,
  tags: String,
  status: Boolean,
  updated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  dueDate: {type: Date},
})

var TaskModel = mongoose.model("TaskModel", taskSchema)
export default TaskModel
