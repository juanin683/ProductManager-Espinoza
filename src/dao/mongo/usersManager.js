import mongoose from "mongoose";
import userModel from "../../models/users.schema.js";
import bcrypt from "bcrypt";

export default class UserManager {
  constructor() {}

async getUsers() {
  
  try {
    const users = await userModel.find().lean();
  
    return users;
    
  } catch (error) {
    return []
  }
}

async getUsersByEmail(email) {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    console.log(error)
  }
}


async getId(id) {

  try {
  return await userModel.findById(id)
  } catch (error) {
    console.log(error.message)
  }
}

async saveUserAndPass(email, password) {
  const userAndPass = await userModel.find({ email,password });
  if (!userAndPass) return false;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await userAndPass.save();
  console.log(userAndPass)
}

async updateUser(email) {
 
try {
  const user = await userModel.findOne({ email});
  // user.user.avatar = profile_picture;
 await user.save();
} catch (error) {
  console.log(error.message)
}
}

async createNewUser(user) {
  const userSalt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, userSalt);
  //  await userModel.create(user);
  const createUser = await userModel.create(user);
  return createUser;
}

async validateUser(email, password) {
  const user = await userModel.findOne({ email });
  if (!user) return false;
  const isEqual = await bcrypt.compare(password, user.password);
  return isEqual ? user.toObject() : false;
}

}
