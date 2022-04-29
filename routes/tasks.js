import express from "express"
import { upload } from "../controllers/files.js"
import Item from "../controllers/tasks.js"

import {
  getTasks,
  createTask,
  editTask,
  deleteTask,
  getTaskById,
  getTaskTags,
} from "../controllers/tasks.js"

const router = express.Router()

router.get("/", getTasks)

router.get("/:taskId", getTaskById)

router.get("/:taskId/tags", getTaskTags)

router.post("/", upload.single("file"), createTask, Item)

router.patch("/:taskId", editTask)

router.delete("/:taskId", deleteTask)

export default router
