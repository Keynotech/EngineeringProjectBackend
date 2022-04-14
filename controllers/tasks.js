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
    priopity: req.body.priopity,
    description: req.body.description,
    attachments: req.body.attachments,
    tags: req.body.tags,
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

export const getOneTask = async (req, res) => {
  try{
    const task = await TaskModel.findById(req.params.taskId);
    res.json(task);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const editTask = async (req, res) => {
  try{
     const task =  await TaskModel.updateOne({_id: req.params.taskId}, 
      {$set : {
      title: req.body.title,
      priority: req.body.priority,
      description: req.body.description,
      attachments: req.body.attachments,
      tags: req.body.tags,
      status: req.body.status,
    }});
    res.json(task);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try{
    const task = await TaskModel.findById(req.params.taskId);
    await TaskModel.deleteOne({_id:req.params.taskId});

    res.json(task);
 }
 catch (error) {
   res.status(400).json({ message: error.message })
 }
}

export default router
