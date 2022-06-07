import express from "express"
import ProjectModel from "../projects/projectModel.js"
import TaskModel from "../tasks/taskModel.js"
import UserModel from "../users/userModel.js"
import FolderModel from "./folderModel.js"

import { ID } from "../loggedUser.js"
const router = express.Router()

//create new folder
export const createNewFolder = async (req, res) => {
  try {
    const newFolder = new FolderModel({
      folderName: req.body.folderName,
      user: ID,
    })
    await newFolder.save()
    res.json(newFolder)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getSingleFolder = async (req, res) => {
  try {
    const folder = await FolderModel.findOne({ _id: req.params.folderId })
    res.status(200).json(folder)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//get all folders
export const getAllFolders = async (req, res) => {
  try {
    const folder = await FolderModel.find({ user: ID })
    res.status(200).json(folder)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//get all project from folders
export const getAllFolderProjects = async (req, res) => {
  try {
    const folder = await ProjectModel.find({
      folder: { $eq: req.params.folderId },
    })
    res.status(200).json(folder)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// edit folder
export const editFolder = async (req, res) => {
  try {
    const project = await ProjectModel.updateOne(
      { _id: req.params.projectId },
      { $set: { projectName: req.body.projectName } }
    )
    res.status(200).json(project)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Project and tasks in project remove

export const removeFolder = async (req, res) => {
  try {
    const Projects_in_Folder = await ProjectModel.find({
      folder: { $eq: req.params.folderId },
    })
    console.log(Projects_in_Folder)

    //USUWANIE ZADAŃ
    for (var i = 0; i < Projects_in_Folder.length; i++) {
      console.log(Projects_in_Folder[i]._id)

      const Tasks_in_Projects = await TaskModel.deleteMany({
        project: { $eq: Projects_in_Folder[i]._id },
      })
      console.log(Tasks_in_Projects)
    }

    //USUWANIE PROJEKTÓW
    for (var i = 0; i < Projects_in_Folder.length; i++) {
      console.log(Projects_in_Folder[i]._id)
      const SkanTasksinProjects = await TaskModel.find({
        project: { $eq: Projects_in_Folder[i]._id },
      })
      console.log(SkanTasksinProjects, "skan")

      if (SkanTasksinProjects.length == 0) {
        const Projects_in_Folder = await ProjectModel.deleteMany({
          folder: { $eq: req.params.folderId },
        })
        console.log("Projekt usunięty:", Projects_in_Folder[i])
      }
    }

    //USUNIĘCIE FOLDERU

    //USUWANIE USERS DETAILS
    //const user = await UserModel.findById({ _id: ID })
    //const folderToDelete = user.folders.indexOf(req.params.folderId)
    //user.folders.splice(folderToDelete, 1)
    //user.save()

    //await FolderModel.deleteOne({ _id: req.params.folderId })

    res.json(Projects_in_Folder)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
