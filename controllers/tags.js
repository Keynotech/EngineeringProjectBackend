import express from "express"
import TagModel from "../models/tagModel.js"
import TaskModel from "../models/taskModel.js"

const router = express.Router()

export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find()
    res.status(200).json(tags)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTasksByTag = async (req, res) => {
  try {
    const { tagId } = req.params
    const tasks = await TaskModel.findById(req.params.tagId)
    res.status(201).json(tasks)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const newTasktoTag = async (req, res) => {
  try {
    const { taskId } = req.params

    const newTag = new TagModel(req.body)

    const task = await TaskModel.findById(req.params.taskId)

    newTag.tasks = task

    await newTag.save()

    task.tags.push(newTag)

    await task.save()

    res.status(200).json(newTag)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
