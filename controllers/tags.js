import express from "express"
import TagModel from "../models/tagModel.js"
import TaskModel from "../models/taskModel.js"

const router = express.Router()

//Get All tags
export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find()
    res.status(200).json(tags)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTagById = async (req, res) => {
  try {
    const tag = await TagModel.findById(req.params.tagId)
    res.json(tag)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//Get All tasks with this tag
export const getTasksByTag = async (req, res) => {
  try {
    const tasks = await TagModel.findById(req.params.tagId).populate("tasks");
    res.status(201).json(tasks.tasks)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//Edit Tag <in progress>
export const editTag = async (req, res) => {
  try {
    const tag = await TagModel.updateOne(
      { _id: req.params.tagId },
      {
        $set: {
          tagName: req.body.title,
        },
      }
    )
    res.json(tag)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//Create Tag
export const newTag = async (req, res) => {
  try {
    const newTag = new TagModel({
      tagName: req.body.tagsArray,
      tasks: [],
    })
    await newTag.save()
    res.json(newTag)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//Remove Tag
export const removeTag = async(req, res) => {
try{
  const tag = await TagModel.findById(req.params.tagId).populate("tasks")

  let tasks = tag.tasks;
  tasks.forEach(task => {
    let index = task.tags.indexOf(tag._id);
    task.tags.splice(index,1);
    task.save();
    console.log(index);
  })

  await TagModel.deleteOne({ _id: req.params.tagId })


  //Delete Task from tags

  res.json(tag)
} catch (error) {
  res.status(400).json({ message: error.message })
}

}
