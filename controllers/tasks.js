import express from "express"
import TaskModel from "../models/taskModel.js"
import TagModel from "../models/tagModel.js"

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
    const tag = await TagModel.findOne({ tagName: req.body.tagsArray })

    //If tag not exists
    if (tag === null) {
      const newTag = new TagModel({
        tagName: req.body.tagsArray,
        tasks: [task],
      })
      newTag.save()
      const tag = await TagModel.findOne({ tagName: req.body.tagsArray })

      task.tags.push(newTag._id)
      console.log(newTag);
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
export const getTaskTags = async (req,res) =>{
  const task = await TaskModel.findById(req.params.taskId).populate("tags");
  res.json(task.tags);
}

//Get One specified task
export const getOneTask = async (req, res) => {
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
          tags: req.body.tags,
          status: req.body.status,
          dueDate: req.body.dueDate,
          updated: Date.now
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
    const task = await TaskModel.findById(req.params.taskId)



    await TaskModel.deleteOne({ _id: req.params.taskId })


    //Delete Task from tags

    res.json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export default router
