import mongoose from "mongoose"

const folderSchema = mongoose.Schema({
  folderName: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
})
var FolderModel = mongoose.model("FolderModel", folderSchema)
export default FolderModel
