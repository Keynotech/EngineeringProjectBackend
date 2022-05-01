import express from "express"
import {getUserTasks ,createUserTask, removeUserTask, getSingleUserTask, editSingleUserTask,getAllTaskTags} from "./taskController.js";

const router = express.Router()


router.get("/", getUserTasks) //Get All User Tasks
router.get("/:taskId", getSingleUserTask) //Get One User Task
router.get("/:taskId/tags", getAllTaskTags)

//Create new empty Task
router.post("/", createUserTask)

router.patch("/:taskId", editSingleUserTask)

//Remove task
router.delete("/:taskId", removeUserTask)


export default router
