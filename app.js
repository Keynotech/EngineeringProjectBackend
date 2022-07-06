import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import taskRoutes from "./tasks/taskRouter.js"
import tagRoutes from "./tags/tagRouter.js"
import userRoutes from "./users/userRouter.js"
import fileRoutes from "./files/fileRouter.js"
import projectRoutes from "./projects/projectRouter.js"
import folderRoutes from "./folders/folderRouter.js"

//import { getToken } from "./firebase-auth-middleware.js"
import admin from "firebase-admin";
var serviceAccount = './jettasks.json';

import "dotenv/config"

const app = express()

//Middlewares

app.use(cors())
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const myLogger = async function(req,res,next){
  const token = req.headers.authorization;
  console.log(token);
  try{

  const decodeValue = await admin.auth().verifyIdToken(token);
  console.log("TOKEN:"+decodeValue.uid);
  if(decodeValue){
    console.log("TOKEN:"+decodeValue);
      return next();
  }

  return res.json({message:"Authorization..."});
              
}catch(e){
  return res.json({message:"Authorization error!"});
}
}

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
