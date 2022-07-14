import multer from "multer"
import FileModel from "./fileModel.js"
import TaskModel from "../tasks/taskModel.js"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import mongodb from "mongodb"
import assert from "assert"
import fs from "fs"
import { GridFsStorage } from "multer-gridfs-storage"
import Grid from "gridfs-stream"
import mongoose from "mongoose"
import crypto from "crypto"

import "dotenv/config"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { ID } from "../../loggedUser.js"

const router = express.Router()
const CONNECTION_URL = process.env.DB_CONNECTION
const clientdb = new mongodb.MongoClient(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

// Create mongo connection
const conn = mongoose.createConnection(CONNECTION_URL)

// Init gfs

let gfs, gridfsBucket
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: ID,
  })

  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection(ID)
})

//multer

const storage = new GridFsStorage({
  url: CONNECTION_URL,
  client: clientdb,

  file: (req, file, cb) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString("hex") + path.extname(file.originalname)
        const fileInfo = {
          filename: filename,
          bucketName: ID,
          chunkSize: 1024,
        }
        resolve(fileInfo)
      })
    })
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
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/octet-stream"
    ) {
      cb(null, true)
    } else {
      return cb(new Error("Bad file type! " + file.mimetype), false)
    }
  },
})

export const uploadFiletoTask = async (req, res) => {
  console.log(req.ip)
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
  console.log(req.ip)
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

    const file2 = await FileModel.findOne({ _id: req.params.fileId })
    const bucket_filename = file2.file[0].filename
    console.log(bucket_filename)
    const originalname = file2.file[0].originalname
    console.log(originalname)
    const bucket_file = await gfs.files.findOne({ filename: bucket_filename })
    gridfsBucket.delete(bucket_file._id)

    await FileModel.deleteOne({ _id: req.params.fileId })

    res.status(200)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getSingleFile = async (req, res) => {
  try {
    const file = await FileModel.findOne({ _id: req.params.fileId })
    const bucket_filename = file.file[0].filename
    console.log(bucket_filename)
    const originalname = file.file[0].originalname
    console.log(originalname)
    //const bucket_file = await gfs.files.findbyID({ ID })
    const bucket_file = await gfs.files.findOne({ filename: bucket_filename })
    console.log(bucket_file._id)
    gridfsBucket
      .openDownloadStream(bucket_file._id)
      .pipe(fs.createWriteStream(`./bufor/${bucket_filename}`))
      .on("error", function (error) {
        assert.ifError(error)
      })
      .on("end", function () {
        console.log("done!")
        var path = `./bufor/${file.file[0].filename}`
        res.download(path)
        process.exit(0)
      })

    //return res.json(file)
  } catch (error) {}
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
