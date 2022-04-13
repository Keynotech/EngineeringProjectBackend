import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import taskRoutes from "./routes/tasks.js"

const app = express()

//Middlewares
app.use(cors())
app.use(express.json())
app.use("/tasks", taskRoutes)

//Routes
app.get("/", (req, res) => res.send())

//Connect to DB
const CONNECTION_URL = ""
const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running, port: ${PORT}`))
  )
  .catch((error) => console.log(error.message))
