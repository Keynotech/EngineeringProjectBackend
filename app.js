import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import taskRoutes from "./routes/tasks.js"
import tagsRoutes from "./routes/tags.js"
import "dotenv/config"

import { upload } from "./controllers/files.js"

const app = express()

//Middlewares

app.use(cors())
app.use(express.json())
app.use("/tasks", taskRoutes)
app.use("/tags", tagsRoutes)

//multer post
app.post("/img", upload.single("file"), function (req, res) {
  res.json({})
})


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
