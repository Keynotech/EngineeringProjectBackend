import express from "express"

import {
  getTasks,
  createTask,
  editTask,
  deleteTask,
  getOneTask,
  getTaskTags,
} from "../controllers/tasks.js"

const router = express.Router()

router.get("/", getTasks)

router.get("/:taskId", getOneTask)

router.get("/:taskId/tags", getTaskTags)

router.post("/", createTask)

router.patch("/:taskId", editTask)

router.delete("/:taskId", deleteTask)

export default router
