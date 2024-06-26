import { Schema, model } from "mongoose";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
