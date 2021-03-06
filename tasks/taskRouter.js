import express from "express"
import {
  getUserTasks,
  createUserTask,
  removeUserTask,
  getSingleUserTask,
  editSingleUserTask,
  getAllTaskTags,
  getTasksByTag,
} from "./taskController.js"

const router = express.Router()

router.get("/", getUserTasks) //Get All User Tasks
router.get("/:taskId", getSingleUserTask) //Get One User Task
router.get("/:taskId/tags", getAllTaskTags) //get all task tags
router.get("/findByTag/:tagId", getTasksByTag) //get all tasks with tag

//Create new empty Task
router.post("/", createUserTask)

router.patch("/:taskId", editSingleUserTask)

//Remove task
router.delete("/:taskId", removeUserTask)

export default router
