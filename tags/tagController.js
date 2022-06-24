import express from "express"
import TagModel from "./tagModel.js"
import TaskModel from "../tasks/taskModel.js"
import UserModel from "../users/userModel.js"

import { ID } from "../loggedUser.js"
const router = express.Router()

//create new user tag
export const createNewUserTag = async (req, res) => {
  console.log(req.ip);
  try {
    const newTag = new TagModel({
      tagName: req.body.tagName,
      user: ID,
    })
    await newTag.save()
    res.json(newTag)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

//get all user tags
export const getAllUserTags = async (req, res) => {
  console.log(req.ip);
  try {
    const tags = await TagModel.find({ user: ID })
    res.status(200).json(tags)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

//remove user user tag
export const removeUserTag = async (req, res) => {
  console.log(req.ip);
  try {
    const tag = await TagModel.findById({ _id: req.params.tagId })

    const user = await UserModel.findById({ _id: ID }).populate("tasks")
    const tasks = user.tasks
    console.log(tasks)
    tasks.forEach((task) => {
      let index = task.tags.indexOf(tag._id)
      console.log(index)
      task.tags.splice(index, 1)
      task.save()
    })

    await TagModel.deleteOne({ _id: req.params.tagId })
    res.status(200).json(tag)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const editSingleUserTag = async (req, res) => {
  console.log(req.ip);
  try {
    const tag = await TagModel.updateOne(
      { _id: req.params.tagId },
      { $set: { tagName: req.body.tagName } }
    )
    res.status(200).json(tag)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
