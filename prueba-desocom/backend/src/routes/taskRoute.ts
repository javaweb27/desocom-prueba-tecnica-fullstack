import { Router } from "express";
import * as taskController from "../controllers/taskController";

export const taskRoute = Router();

taskRoute.get("/", taskController.getAll);

taskRoute.get("/:taskId", taskController.getById);

taskRoute.post("/", taskController.create);

taskRoute.put("/:taskId", taskController.modifyById);

taskRoute.delete("/:taskId", taskController.deleteById);
