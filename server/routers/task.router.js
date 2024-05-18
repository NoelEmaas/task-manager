import { Router } from "express";
import TaskController from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.get("/", TaskController.list);
taskRouter.get("/:id", TaskController.get);
taskRouter.post("/", TaskController.create);
taskRouter.put("/", TaskController.update);
taskRouter.delete("/:id", TaskController.drop);

export { taskRouter }
