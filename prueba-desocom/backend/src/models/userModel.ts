import { Schema, model } from "mongoose";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type UserRequestCreate = Omit<User, "_id"> & {
  isAdmin: boolean;
};
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
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

export default model("users", UserSchema);
