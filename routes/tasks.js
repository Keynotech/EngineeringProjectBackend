import express from "express";

import { getTasks, createTask, editTask, deleteTask, getOneTask } from "../controllers/tasks.js";

const router = express.Router();

router.get("/", getTasks);

router.get("/:taskId", getOneTask);

router.post("/", createTask);

router.patch("/:taskId",editTask);

router.delete("/:taskId",deleteTask);

export default router;
