import multer from "multer"
import FileModel from "./fileModel.js"
import TaskModel from "../tasks/taskModel.js"
import UserModel from "../users/userModel.js"
import express, { application } from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { ID } from "../../loggedUser.js"
const router = express.Router()

//multer
const uploads_path = "./uploads"
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploads_path) //dir path
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
      file.mimetype == "image/jpg" ||
      file.mimetype == "text/plain" || // zip rar 7zip xml
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || //docx
      file.mimetype ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || //xlsx
      file.mimetype == "application/pdf"
    ) {
      cb(null, true)
    } else {
      return cb(new Error("Bad file type! " + file.mimetype), false)
    }
  },
})

export const uploadFiletoTask = async (req, res) => {
  console.log(req.ip);
  try {
    const task = await TaskModel.findById({ _id: req.params.taskId })
    const data = []
    for (var x = 0; x < req.files.length; x++) {
      var file = new FileModel({
        file: req.files[x],
        user: ID,
        originalname: req.files[x].originalname,
      })
      task.files.push(file)
      file.save(file)
      data.push(file)
    }

    task.save()
    res.json(data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//remove file in task
export const removeFile = async (req, res) => {
  console.log(req.ip);
  try {
    //  const user = await UserModel.findById({ _id: ID }).populate("tasks")
    const task = await TaskModel.findById({ _id: req.params.taskId })
    const files = task.files
    let index = req.params.fileId

    const fileIdToDelete = files.findIndex(
      (file) => file._id.toString() === index
    )
    task.files.splice(fileIdToDelete, 1)
    task.save()

    await FileModel.deleteOne({ _id: req.params.fileId })
    res.status(200)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getSingleFile = async (req, res) => {
  try {
    const file = await FileModel.findOne({ _id: req.params.fileId })
    var path = `${file.file[0].destination}/${file.file[0].filename}`
    res.download(path)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//get all projects
export const getAllFiles = async (req, res) => {
  try {
    const file = await FileModel.find({ user: ID })
    res.status(200).json(file)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default router
