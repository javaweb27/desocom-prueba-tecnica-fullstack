import { Request, Response } from "express";
import taskModel, {
  Task,
  TaskRequestCreate,
  TaskRequestModify,
} from "../models/taskModel";
import { isValidMongoId } from "../utils/isValidMongoId";
import { jwtVerifier } from "../utils/jwtVerifier";
import userModel from "../models/userModel";

/**
 * get all
 */
export const getAll = async (cli: Request, res: Response) => {
  const jwtToken = cli.headers.authorization?.split(" ")[1];

  let payload: { _id: string; iat: number };

  try {
    payload = await jwtVerifier<{ _id: string; iat: number }>(jwtToken);
  } catch (error) {
    res.status(401).send("el jwt token es invalido, debes iniciar sesion");
    return;
  }

  const user = await userModel.findById(payload);

  if (null === user) {
    res
      .status(401)
      .send("el usuario no existe, crea una cuenta y luego inicia sesion");
    return;
  }

  const tasks = await taskModel.find({ userId: user._id });

  if (0 === tasks.length) {
    res.sendStatus(404);
    return;
  }

  res.json(tasks);
};

/**
 * get by id
 */
export const getById = async (cli: Request, res: Response) => {
  if (false == isValidMongoId(cli.params.taskId)) {
    res.sendStatus(404);
    return;
  }

  const task = await taskModel.findById(cli.params.taskId);

  if (null == task) {
    res.sendStatus(404);
    return;
  }

  res.json(task);
};

/**
 * create
 */
export const create = async (cli: Request, res: Response) => {
  const jwtToken = cli.headers.authorization?.split(" ")[1];

  let payload: { _id: string; iat: number };

  try {
    payload = await jwtVerifier<{ _id: string; iat: number }>(jwtToken);
  } catch (error) {
    res.status(401).send("el jwt token es invalido, debes iniciar sesion");
    return;
  }

  const user = await userModel.findById(payload._id);

  if (null === user) {
    res
      .status(401)
      .send("el usuario no existe, crea una cuenta y luego inicia sesion");
    return;
  }

  let { title, description } = cli.body as TaskRequestCreate;

  if (title.trim().length < 3) {
    res.status(400).send("el titulo debe tener 3 o mas caracteres");
    return;
  }

  const task = await taskModel.create({
    title: title.trim(),
    status: "pendiente",
    createdAt: Date.now(),
    description: description?.trim() || undefined,
    userId: user._id.toString(),
  } satisfies Omit<Task, "_id">);

  res.status(201).json(task);
};

/**
 * modify by id
 */

export const modifyById = async (cli: Request, res: Response) => {
  if (false == isValidMongoId(cli.params.taskId)) {
    res.sendStatus(404);
    return;
  }

  const newData = cli.body as TaskRequestModify;

  const task = await taskModel.findById(cli.params.taskId);

  if (null == task) {
    res.sendStatus(404);
    return;
  }

  task.title = newData.title;
  task.description = newData.description || undefined;
  task.status = newData.status;

  await task.save();

  res.json(task);
};
