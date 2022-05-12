import express from "express"
import {
  getUserTasks,
  createUserTask,
  removeUserTask,
  getSingleUserTask,
  editSingleUserTask,
  getAllTaskTags,
} from "./taskController.js"
import { uploadFiletoTask, upload } from "../files/fileController.js"

const router = express.Router()

router.get("/", getUserTasks) //Get All User Tasks
router.get("/:taskId", getSingleUserTask) //Get One User Task
router.get("/:taskId/tags", getAllTaskTags)

router.post("/:taskId/files", upload.array("file", 3), uploadFiletoTask) // Post all Files to task

//Create new empty Task
router.post("/", createUserTask)

router.patch("/:taskId", editSingleUserTask)

//Remove task
router.delete("/:taskId", removeUserTask)

export default router
