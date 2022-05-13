import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import taskRoutes from "./tasks/taskRouter.js"
import tagRoutes from "./tags/tagRouter.js"
import userRoutes from "./users/userRouter.js"
import fileRoutes from "./files/fileRouter.js"
import "dotenv/config"

const app = express()

//Middlewares

app.use(cors())
app.use(express.json())
app.use("/tasks", taskRoutes)
app.use("/tags", tagRoutes)
app.use("/users", userRoutes)
app.use("/tasks", fileRoutes)

app.use("/upload", express.static("uploads"))

//Routes
app.get("/", (req, res) => res.send())

//Connect to DB
const CONNECTION_URL = process.env.DB_CONNECTION
const PORT = process.env.PORT

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))
