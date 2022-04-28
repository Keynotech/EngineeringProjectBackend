import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    //required: [true],
  },
})

var FileModel = mongoose.model("FileModel", fileSchema)
export default FileModel
