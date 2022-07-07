import express from "express"
import TaskModel from "./taskModel.js"
import UserModel from "../users/userModel.js"
import mongoose from "mongoose"

import { ID } from "../../loggedUser.js"
const router = express.Router()

export const getUserTasks = async (req, res) => {
  //get all user tasks
  console.log(req.ip);
  try {
    const user = await UserModel.findById({ _id: ID }).populate("tasks")
    res.status(200).json(user.tasks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getAllTaskTags = async (req, res) => {
  //getall tasks
  console.log(req.ip);
  try {
    const task = await TaskModel.findOne({ _id: req.params.taskId }).populate(
      "tags"
    )
    res.status(200).json(task.tags)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTasksByTag = async (req, res) => {
  //get Tasks by TagID
  console.log(req.ip);
  try {
    console.log(req.params.tagId)
    const tasks = await TaskModel.find({
      tags: { $elemMatch: { $eq: req.params.tagId } },
    })
    console.log(tasks)
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getSingleUserTask = async (req, res) => {
  //get single task
  console.log(req.ip);
  try {
    const task = await TaskModel.findOne({ _id: req.params.taskId })
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Creating only task
export const createUserTask = async (req, res) => {
  //create task
  console.log(req.ip);
  const projectId = req.body.project
  
  try {
    const task = new TaskModel({
      title: req.body.title,
      priority: req.body.priority,
      description: req.body.description,
      status: req.body.status,
      tags: req.body.tags,
      dueDate: req.body.dueDate,
      project: projectId,
    })
    task.save()

    const user = await UserModel.findById({ _id: ID })
    user.tasks.push(task)
    user.save()
    res.json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Task removing - complete
export const removeUserTask = async (req, res) => {
  //remove task
  console.log(req.ip);
  try {
    const user = await UserModel.findById({ _id: ID }) //get User

    const taskToDelete = user.tasks.indexOf(req.params.taskId) //get Index task for delete
    user.tasks.splice(taskToDelete, 1) //remove task from user's tasks array
    user.save() //save user
    await TaskModel.deleteOne({ _id: req.params.taskId }) //remove task

    res.json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const editSingleUserTask = async (req, res) => {
  //edit task
  console.log(req.ip);
  try {
    const task = await TaskModel.updateOne(
      { _id: req.params.taskId },
      {
        $set: {
          title: req.body.title,
          priority: req.body.priority,
          description: req.body.description,
          status: req.body.status,
          tags: req.body.tags,
          dueDate: req.body.dueDate,
          project: req.body.project,
          updated: Date.now(),
        },
      }
    )
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default router
