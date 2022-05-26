import express from "express"
import {
  getAllProjects,
  createNewProject,
  getSingleProject,
  getAllProjectTasks,
  removeProject,
  editProject,
} from "./projectController.js"

const router = express.Router()

router.get("/", getAllProjects)

router.get("/:projectId", getSingleProject)

router.get("/:projectId/tasks", getAllProjectTasks)

router.post("/", createNewProject)

router.delete("/:projectId", removeProject)

router.patch("/:projectId", editProject)

export default router
