import mongoose from "mongoose"

const tagSchema = mongoose.Schema({
  tagName: String,
  color: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskModel",
    },
  ],
})
var TagModel = mongoose.model("TagModel", tagSchema)
export default TagModel
