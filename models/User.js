import Mongoose from "mongoose";

const User =
  Mongoose.models.User ||
  Mongoose.model("User", {
    name: String,
    email: String,
    createAt: Date
  });

export default User;
