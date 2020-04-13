import Mongoose from "mongoose";

const User =
  Mongoose.models.User ||
  Mongoose.model("User", {
    name: String,
    email: String,
    createAt: { default: Date.now(), type: Date },
    passwordId: String
  });

export default User;
