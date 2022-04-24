import express from "express"

import { getTags, getTasksByTag, newTasktoTag } from "../controllers/tags.js"

const router = express.Router()

router.get("/", getTags)

router.get("/:tagId", getTasksByTag)

router.post("/:taskId/tags", newTasktoTag)

export default router
