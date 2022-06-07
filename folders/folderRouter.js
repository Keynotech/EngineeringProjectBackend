import express from "express"
import {
  getAllFolders,
  createNewFolder,
  getSingleFolder,
  getAllFolderProjects,
  removeFolder,
  editFolder,
} from "./folderController.js"

const router = express.Router()

router.get("/", getAllFolders)

router.get("/:folderId", getSingleFolder)

router.get("/:folderId/projects", getAllFolderProjects)

router.post("/", createNewFolder)

router.delete("/:folderId", removeFolder)

router.patch("/:folderId", editFolder)

export default router
