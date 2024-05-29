import { Schema, model } from "mongoose";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export type UserRequestCreate = Omit<User, "_id">;
export type UserRequestLogin = Omit<User, "_id" | "name">;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  //  todo: role? -> user \ admin, solo los admins pueden obtener la lista de todos los usuarios
});

export default model("users", UserSchema);
