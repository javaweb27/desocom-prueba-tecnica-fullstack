import { Schema, model } from "mongoose";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "pendiente" | "en progreso" | "completada";
  createdAt: number;
  userId?: string;
};

export type TaskRequestCreate = Pick<Task, "title" | "description">;
export type TaskRequestModify = Pick<Task, "title" | "description" | "status">;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, required: false },
});

export default model("tasks", TaskSchema);
