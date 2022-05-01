import express from "express"
import { getAllUsers, createNewUser } from "../users/userController.js"

const router = express.Router()

//Get All Users
router.get("/", getAllUsers)

//Create new User
router.post("/", createNewUser)


export default router
