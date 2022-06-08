import express from "express"
import ProjectModel from "./projectModel.js"
import TaskModel from "../tasks/taskModel.js"
import UserModel from "../users/userModel.js"

import { ID } from "../loggedUser.js"
const router = express.Router()

//create new project
export const createNewProject = async (req, res) => {
  try {
    const newProject = new ProjectModel({
      projectName: req.body.projectName,
      user: ID,
    })
    await newProject.save()

    const user = await UserModel.findById({ _id: ID })
    user.projects.push(newProject)
    user.save()

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
    const project = await ProjectModel.find({ user: ID })
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

//Project and tasks in project remove
export const removeProject = async (req, res) => {
  try {
    const tasksinproject = await TaskModel.deleteMany({
      project: { $eq: req.params.projectId },
    })

    const user = await UserModel.findById({ _id: ID })
    const projectToDelete = user.projects.indexOf(req.params.projectId)

    user.projects.splice(projectToDelete, 1)
    user.save()
    await ProjectModel.deleteOne({ _id: req.params.projectId })

    res.json(tasksinproject)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// edit project
export const editProject = async (req, res) => {
  try {
    const project = await ProjectModel.updateOne(
      { _id: req.params.projectId },
      {
        $set: { projectName: req.body.projectName, folder: req.body.folder },
      }
    )
    res.status(200).json(project)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
