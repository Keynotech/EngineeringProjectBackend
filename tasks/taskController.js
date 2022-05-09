import express from "express"
import TaskModel from "./taskModel.js"
import UserModel from "../users/userModel.js"
import mongoose from "mongoose"

const router = express.Router()
const defaultUserId = "6278217a9d4d08518aeef835"

export const getUserTasks = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: defaultUserId }).populate(
      "tasks"
    ) //Using admin user for testing
    res.status(200).json(user.tasks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getAllTaskTags = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ _id: req.params.taskId }).populate(
      "tags"
    )
    res.status(200).json(task.tags)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// get all task files
export const getAllTaskFiles = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ _id: req.params.fileId }).populate(
      "files"
    )
    res.status(200).json(task.files)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getSingleUserTask = async (req, res) => {
  try {
    const task = await TaskModel.findOne({ _id: req.params.taskId })
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Creating only task
export const createUserTask = async (req, res) => {
  try {
    const task = new TaskModel({
      title: req.body.title,
      priority: req.body.priority,
      description: req.body.description,
      attachments: req.body.attachments,
      status: req.body.status,
      tags: req.body.tags,
      dueDate: req.body.dueDate,
    })
    task.save()

    const user = await UserModel.findById({ _id: defaultUserId })
    user.tasks.push(task)
    user.save()
    res.json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Task removing - complete
export const removeUserTask = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: defaultUserId }) //get User

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
        },
      }
    )
    res.status(200).json(task)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//============================================

/*
//Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//Create a mew Task with tag
export const createTask = async (req, res) => {
  const task = new TaskModel({
    title: req.body.title,
    priority: req.body.priority,
    description: req.body.description,
    attachments: req.body.attachments,
    status: req.body.status,
    dueDate: req.body.dueDate,
  })

  try {
    for (const elem of req.body.tags) {
      const tag = await TagModel.findOne({ _id: elem })
      if (tag) {
        tag.tasks.push(task)
        task.tags.push(tag)
        await tag.save()
      }
    }
    await task.save(task)
    res.json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//Get all tags from specified task
export const getTaskTags = async (req, res) => {
  const task = await TaskModel.findById(req.params.taskId).populate("tags")
  res.json(task.tags)
}

export const editTaskTags = async (req, res) =>{ 
  const task = await TaskModel.findById(req.params.taskId);
  const tags = task.tags;
  console.log(console.log(tags))

  const newTags = await TaskModel.updateOne(
    { _id: req.params.taskId },
    {
      $set: {
        tag: req.params.newTags,
      },
    }
  )

  res.json(task)
}

//Get One specified task
export const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.taskId)
    res.json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//Edit task
export const editTask = async (req, res) => {
  try {
    const task = await TaskModel.updateOne(
      { _id: req.params.taskId },
      {
        $set: {
          title: req.body.title,
          priority: req.body.priority,
          description: req.body.description,
          attachments: req.body.attachments,
          status: req.body.status,
          dueDate: req.body.dueDate,
          updated: Date.now(),
        },
      }
    )
    res.json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//Remove task
export const deleteTask = async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.taskId).populate("tags")

    let tags = task.tags
    tags.forEach((tag) => {
      let index = tag.tasks.indexOf(task._id)
      tag.tasks.splice(index, 1)
      tag.save()
    })

    await TaskModel.deleteOne({ _id: req.params.taskId })

    //Delete Task from tags

    res.json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
*/

export default router
