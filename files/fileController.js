import multer from "multer"
import FileModel from "./fileModel.js"
import TaskModel from "../tasks/taskModel.js"
import express from "express"

const defaultUserId = "6278217a9d4d08518aeef835"
const router = express.Router()

//multer
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads") //dir path
  },
  filename: (req, file, cb) => {
    cb(null, defaultUserId + "~" + Date.now() + "~" + file.originalname)
  },
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000 },
})

//upload new user file
export const uploadNewUserFile = async (req, res) => {
  try {
    var file = new FileModel({
      file: req.files,
      user: defaultUserId,
    })
    res.json(file)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//upload new file/files to task
export const uploadFiletoTask = async (req, res) => {
  console.log(req.files)
  try {
    const task = await TaskModel.findById({ _id: req.params.taskId })
    for (var file of req.files) {
      var file = new FileModel({
        file,
        user: defaultUserId,
      })
      task.files.push(file)
    }
    task.save()
    res.json(file)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//get all user files
export const getAllFiles = async (req, res) => {
  try {
    const files = await FileModel.find({ user: defaultUserId })
    res.status(200).json(files)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
