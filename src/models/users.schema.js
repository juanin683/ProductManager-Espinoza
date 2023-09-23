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
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  cart: {
    type:[{
      _id: {
          type: mongoose.Types.ObjectId,
          ref: 'carts'
      },
      quantity: {
          type: Number,
          default: 1
      }

  }]
  }
});
const userModel = mongoose.model("users", userSchema);
export default userModel;