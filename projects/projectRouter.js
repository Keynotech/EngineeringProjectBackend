import express from "express"
import {
  getAllProjects,
  createNewProject,
  getSingleProject,
  getAllProjectTasks,
} from "./projectController.js"

const router = express.Router()

router.get("/", getAllProjects)

router.get("/:projectId", getSingleProject)

router.get("/:projectId/tasks", getAllProjectTasks)

router.post("/", createNewProject)

export default router
