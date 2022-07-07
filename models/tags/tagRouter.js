import express from "express"
import { getAllUserTags, createNewUserTag, removeUserTag, editSingleUserTag} from "./tagController.js"


const router = express.Router()

router.get("/", getAllUserTags)

router.post("/", createNewUserTag)

router.delete("/:tagId", removeUserTag)

router.patch("/:tagId", editSingleUserTag)

export default router
