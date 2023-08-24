import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: String,
  username: String,
  password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
const userModel = mongoose.model("users", userSchema);
export default userModel;