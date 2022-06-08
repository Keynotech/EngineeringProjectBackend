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

    const user = await UserModel.findById({ _id: ID })
    user.folders.push(newFolder)
    user.save()

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
    const folder = await FolderModel.updateOne(
      { _id: req.params.folderId },
      { $set: { folderName: req.body.folderName } }
    )
    res.status(200).json(folder)
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
    const folder = await FolderModel.findById({ _id: req.params.folderId })

    //USUWANIE ZADAŃ    OK
    for (var i = 0; i < Projects_in_Folder.length; i++) {
      console.log(Projects_in_Folder[i]._id, "PROJ")

      const Tasks_in_Projects = await TaskModel.deleteMany({
        project: { $eq: Projects_in_Folder[i]._id },
      })
      console.log(Tasks_in_Projects, "TASK IN PROJ!!")
      //USUWANIE PROJEKTÓW
      const ProjectDelete = await ProjectModel.deleteOne({
        _id: Projects_in_Folder[i]._id,
      })
      console.log(ProjectDelete, "DELETE PROJ!!")
    }
    //USUWANIE FOLDERU
    // Usuwanie folderu gdy usunięte zostaną taski i projekty
    if (i == Projects_in_Folder.length - 1) {
      await FolderModel.deleteOne({ _id: req.params.folderId })
      console.log("Folder usunięty!")
    }
    //Jeżeli nie ma projektów w folderze usuń folder
    if (Projects_in_Folder.length == []);
    {
      await FolderModel.deleteOne({ _id: req.params.folderId })
      console.log("Folder usunięty!")
    }

    //USUWANIE USERS DETAILS
    const user = await UserModel.findById({ _id: ID })
    const folderToDelete = user.folders.indexOf(req.params.folderId)
    user.folders.splice(folderToDelete, 1)
    user.save()

    res.json(folder)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default router
