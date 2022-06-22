import mongoose from "mongoose"

const projectSchema = mongoose.Schema({
  projectName: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FolderModel",
  },
})
var ProjectModel = mongoose.model("ProjectModel", projectSchema)
export default ProjectModel
