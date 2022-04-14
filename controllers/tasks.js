import express from "express"
import TaskModel from "../models/taskModel.js"

const router = express.Router()

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find()
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createTask = async (req, res) => {
  const task = new TaskModel({
    title: req.body.title,
    status: req.body.status,
  })
  try {
    await task.save().then((task) => {
      res.redirect("/")
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export default router
