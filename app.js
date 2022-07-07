import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import taskRoutes from "./models/tasks/taskRouter.js"
import tagRoutes from "./models/tags/tagRouter.js"
import userRoutes from "./models/users/userRouter.js"
import fileRoutes from "./models/files/fileRouter.js"
import projectRoutes from "./models/projects/projectRouter.js"
import folderRoutes from "./models/folders/folderRouter.js"

//import { getToken } from "./firebase-auth-middleware.js"

import myLogger from "./firebase/firebase-auth-middleware.js"

import "dotenv/config"

const app = express()

//Middlewares

app.use(cors())

app.use(myLogger);
app.use(express.json())
app.use("/tasks", taskRoutes)
app.use("/tags", tagRoutes)
app.use("/users", userRoutes)
app.use("/tasks", fileRoutes)
app.use("/files", fileRoutes)
app.use("/projects", projectRoutes)
app.use("/folders", folderRoutes)


// path file userid == userid
app.use("/tasks/:taskId/:fileId", express.static("uploads"))


//Connect to DB
const CONNECTION_URL = process.env.DB_CONNECTION
const PORT = process.env.PORT

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))
