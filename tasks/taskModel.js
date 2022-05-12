import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
  title: String,
  priority: Number,
  description: String,
  attachments: String,
  status: Boolean,
  updated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  tags: [
    //tags created
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TagModel",
    },
  ],
  files: {
    type: Array,
    ref: "FileModel",
  },
})

var TaskModel = mongoose.model("TaskModel", taskSchema)
export default TaskModel
