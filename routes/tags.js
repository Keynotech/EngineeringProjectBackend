import express from "express"

import { getTags, getTasksByTag, editTag, newTag } from "../controllers/tags.js"

const router = express.Router()

router.get("/", getTags)

router.get("/:tagId/tasks", getTasksByTag)

router.post("/", newTag)

router.patch("/:taskId", editTag)

export default router
