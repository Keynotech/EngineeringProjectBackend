import express from "express"
import { removeFile, uploadFiletoTask, upload } from "./fileController.js"

const router = express.Router()

router.post("/:taskId/files", upload.array("file", 3), uploadFiletoTask) // Post all Files to task

router.delete("/:taskId/:fileId", removeFile)

export default router
