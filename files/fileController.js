import multer from "multer"
import FileModel from "./fileModel.js"
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
  limits: { fileSize: 10000000 }, //limit for one file
})

//upload new user file
export const uploadNewUserFile = async (req, res) => {
  try {
    const file = new FileModel({
      file: req.file,
      user: defaultUserId,
    })
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
