import mongoose from 'mongoose';


const userPasswordSchema = new mongoose.Schema({
    email: { type: String, ref: "users" },
    token: { type: String, required: true },
    created: { type: Date, default: Date.now, expireAfterSeconds: 3600 },
})

const UserPasswordModel = mongoose.model("userPasswords", userPasswordSchema)

export default UserPasswordModel;