import express from "express"
import { upload, uploadNewUserFile, getAllFiles } from "./fileController.js"

const router = express.Router()

//Get All Files
router.get("/", getAllFiles)

//Upload new File
router.post("/", upload.single("file"), uploadNewUserFile)

export default router
