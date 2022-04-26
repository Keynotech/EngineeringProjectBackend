import express from "express"

import { getTags, getTasksByTag, editTag, newTag, removeTag, getTagById } from "../controllers/tags.js"

const router = express.Router()

router.get("/", getTags)

router.get("/:tagId", getTagById)

router.get("/:tagId/tasks", getTasksByTag)

router.post("/", newTag)

router.patch("/:tagId", editTag)

router.delete("/:tagId", removeTag)

export default router
