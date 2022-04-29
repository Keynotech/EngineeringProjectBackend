import express from "express"
import TaskModel from "../models/taskModel.js"
import TagModel from "../models/tagModel.js"
import FileModel from "../models/FileModel.js"

const router = express.Router()

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
    const tag = await TagModel.findOne({ tagName: req.body.tagName })

    const file = await FileModel.findOne({ itemImage: req.files })
    //If tag not exists

    if (file !== null) {
      let itemImage = req.file.path
      FileModel.create(
        {
          itemImage: itemImage,
        },
        (err, data) => {
          if (err) return handleError(err)

          res.status(201).json(data)
        }
      )
    }
    //If tag not exists
    if (tag === null) {
      const newTag = new TagModel({
        tagName: req.body.tagName,
        tasks: [task],
      })
      newTag.save()
      task.tags.push(newTag._id)
    }
    //If exists
    else {
      tag.tasks.push(task)
      task.tags.push(tag)
      await tag.save()
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

export default router
