import express from "express"
import UserModel from "./userModel.js"

const router = express.Router()

export const getAllUsers = async (req, res) => {
  console.log(req.ip);
  try {
    const users = await UserModel.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createNewUser = async (req, res) => {
  console.log(req.ip);
  try {
    const user = new UserModel({
      login: req.body.login,
      pass: req.body.pass,
    })

    await user.save(user)
    res.json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export default router
