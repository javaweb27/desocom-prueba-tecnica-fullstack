import { Request, Response } from "express";
import taskModel, {
  Task,
  TaskRequestCreate,
  TaskRequestModify,
} from "../models/taskModel";
import { isValidMongoId } from "../utils/isValidMongoId";

/**
 * get all
 */
export const getAll = async (cli: Request, res: Response) => {
  const tasks = await taskModel.find();

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
  let { title, description } = cli.body as TaskRequestCreate;

  const task = await taskModel.create({
    title,
    status: "pendiente",
    createdAt: Date.now(),
    userId: undefined,
    description: description || undefined,
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
