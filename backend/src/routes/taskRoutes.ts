import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController";

const router = Router();

router.get("/api/tasks", getTasks);
router.post("/api/tasks", createTask);
router.put("/api/tasks/:id", updateTask);
router.delete("/api/tasks/:id", deleteTask);

export default router;