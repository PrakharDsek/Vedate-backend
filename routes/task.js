import express from "express"
import { createTask, deleteTask, getTasks, updateTaskStatus } from "../controllers/task.js"
import { isAuth } from "../middlewares/auth.js"

const router=express.Router()

router.post("/new",isAuth, createTask)
router.post("/allTask/:userId",getTasks)
router.put("/update/:id",isAuth, updateTaskStatus)
router.delete("/delete/:id",isAuth, deleteTask)



export default router