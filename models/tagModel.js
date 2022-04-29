import mongoose from "mongoose"

const tagSchema = mongoose.Schema({
  tagName: String,
  color: {
    type: String,
    default: "gray"
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskModel",
    },
  ],
})
var TagModel = mongoose.model("TagModel", tagSchema)
export default TagModel
