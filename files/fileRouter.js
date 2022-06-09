import express from "express"
import {
  removeFile,
  uploadFiletoTask,
  upload,
  getAllFiles,
  getSingleFile,
} from "./fileController.js"

const router = express.Router()

router.get("/", getAllFiles)
router.get("/:fileId", getSingleFile)

router.post("/:taskId/files", upload.array("file", 3), uploadFiletoTask) // Post all Files to task

router.delete("/:taskId/:fileId", removeFile)

export default router
