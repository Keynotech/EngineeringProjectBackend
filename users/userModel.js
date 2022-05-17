import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  login: String, //User login
  pass: String, //User password <temp not hashed, only admin mode at the moment>
  tasks: [ //tasks created by user
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskModel",
    },
  ],
  registeredAt: { type: Date, default: Date.now },
})

var UserModel = mongoose.model("UserModel", userSchema)
export default UserModel
