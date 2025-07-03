import { Router } from "express"; 
import { getTasks } from "./routes/get.tasks";
import { createTask } from "./routes/create.task";
import { updateTask } from "./routes/update.task";
import { deleteTasks } from "./routes/delete.task";
import { getTask } from "./routes/get.task";
import authenticateJWT from "./middlewares/authenticateJWT";

const router = Router();

// Definindo as rotas com autenticação JWT
router.get("/tasks/:userId", authenticateJWT, (req, res) => { getTasks(req, res) });
router.get("/tasks/:userId/:taskId", authenticateJWT, (req, res) => { getTask(req, res) });
router.post("/tasks/:userId", authenticateJWT, (req, res) => { createTask(req, res) });
router.put("/tasks/:userId/:taskId", authenticateJWT, (req, res) => { updateTask(req, res) });
router.delete("/tasks/:userId/:taskId", authenticateJWT, (req, res) => { deleteTasks(req, res) });

export { router };