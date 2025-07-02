import { Router } from "express"; 
import { getTasks } from "./routes/get.tasks";
import { createTask } from "./routes/create.task";
import { updateTask } from "./routes/update.task";
import { deleteTasks } from "./routes/delete.task";
import { getTask } from "./routes/get.task";

const router = Router();

router.get("/tasks/:userId", (req, res) => { getTasks(req, res) });
router.get("/tasks/:userId/:taskId", (req, res) => { getTask(req, res) });
router.post("/tasks/:userId", (req, res) => { createTask(req, res) });
router.put("/tasks/:userId/:taskId", (req, res) => { updateTask(req, res) });
router.delete("/tasks/:userId/:taskId", (req, res) => { deleteTasks(req, res) });

export { router };