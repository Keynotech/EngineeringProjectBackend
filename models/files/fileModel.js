import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
  file: {
    type: Array,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
})

var FileModel = mongoose.model("FileModel", fileSchema)
export default FileModel
