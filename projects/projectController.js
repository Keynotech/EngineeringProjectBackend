import express from "express"
import ProjectModel from "./projectModel.js"
import TaskModel from "../tasks/taskModel.js"

const defaultUserId = "6280f1a5c37bf7fa896eaf84"
const router = express.Router()

//create new project
export const createNewProject = async (req, res) => {
  try {
    const newProject = new ProjectModel({
      projectName: req.body.projectName,
      user: defaultUserId,
    })
    await newProject.save()
    res.json(newProject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getSingleProject = async (req, res) => {
  try {
    const project = await ProjectModel.findOne({ _id: req.params.projectId })
    res.status(200).json(project)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//get all projects
export const getAllProjects = async (req, res) => {
  try {
    const project = await ProjectModel.find({ user: defaultUserId })
    res.status(200).json(project)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//get all tasks from project
export const getAllProjectTasks = async (req, res) => {
  try {
    const project = await TaskModel.find({
      project: { $eq: req.params.projectId },
    })
    res.status(200).json(project)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
