import express from "express"

import {
  getTasks,
  createTask,
  editTask,
  deleteTask,
  getOneTask,
} from "../controllers/tasks.js"

import { getTags, getTasksByTag, newTasktoTag } from "../controllers/tags.js"

const router = express.Router()

router.get("/", getTasks)
router.get("/", getTags)

router.get("/:tagId", getTasksByTag)

router.post("/:taskId/tags", newTasktoTag)

router.get("/:taskId", getOneTask)

router.post("/", createTask)

router.patch("/:taskId", editTask)

router.delete("/:taskId", deleteTask)

export default router
