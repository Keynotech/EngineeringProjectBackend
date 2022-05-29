import mongoose from "mongoose"

const projectSchema = mongoose.Schema({
  projectName: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
})
var ProjectModel = mongoose.model("ProjectModel", projectSchema)
export default ProjectModel
