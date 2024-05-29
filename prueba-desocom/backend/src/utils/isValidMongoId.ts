import mongoose from "mongoose";

export const isValidMongoId = (id: any): boolean => {
  try {
    return mongoose.Types.ObjectId.isValid(id);
  } catch (e) {
    return false;
  }
};
