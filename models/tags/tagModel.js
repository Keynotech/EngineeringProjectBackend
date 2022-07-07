import mongoose from "mongoose"

const tagSchema = mongoose.Schema({
  tagName: String,
  user:  //tags created
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  color: {
    type: String,
    default: "grey"
  },
})
var TagModel = mongoose.model("TagModel", tagSchema)
export default TagModel
