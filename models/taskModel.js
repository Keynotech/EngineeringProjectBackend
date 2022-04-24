import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
  title: String,
  priopity: Number,
  description: String,
  attachments: String,
  status: Boolean,
  updated: { type: Date, default: Date.now },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TagModel",
    },
  ],
})

var TaskModel = mongoose.model("TaskModel", taskSchema)
export default TaskModel
