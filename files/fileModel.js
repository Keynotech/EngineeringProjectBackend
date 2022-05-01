import mongoose from "mongoose"

const fileSchema = new mongoose.Schema(
  {
    itemImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

var FileModel = mongoose.model("FileModel", fileSchema)
export default FileModel
