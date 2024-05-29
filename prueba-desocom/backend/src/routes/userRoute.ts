import { Router } from "express";
import * as userController from "../controllers/userController";

export const userRoute = Router();

userRoute.get("/", userController.getAll);

userRoute.post("/", userController.create);

userRoute.post("/login", userController.login);
