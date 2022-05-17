import multer from "multer"
import FileModel from "./fileModel.js"
import TaskModel from "../tasks/taskModel.js"
import UserModel from "../users/userModel.js"
import express from "express"

import {ID} from "../loggedUser.js";
const router = express.Router()

//multer
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads") //dir path
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true)
    } else {
      return cb(new Error("Bad file type! " + file.mimetype), false)
    }
  },
})

export const uploadFiletoTask = async (req, res) => {
  try {
    const task = await TaskModel.findById({ _id: req.params.taskId })

    for (var x = 0; x < req.files.length; x++) {
      var file = new FileModel({
        file: req.files[x],
        user: ID,
        originalname: req.files[x].originalname,
      })
      task.files.push(file)
      file.save(file)
    }

    task.save()
    res.json(file)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//remove file in task
export const removeFile = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: ID }).populate(
      "tasks"
    )
    const task = await TaskModel.findById({ _id: req.params.taskId })
    const files = task.files

    const index = files.findIndex((file) => file._id === req.params.fileId)
    task.files.splice(index, 1)
    task.save()
    await FileModel.deleteOne({ _id: req.params.fileId })
    res.status(200).json(file)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
