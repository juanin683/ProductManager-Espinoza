import mongoose from "mongoose";
import userModel from "../../models/users.schema.js";
import bcrypt from "bcrypt";

export default class UserManager {
  constructor() {}

  async getUsers() {
    const users = await userModel.find();

    return users;
  }
  async getUsersByName(username) {
    return await userModel.findOne({ username });
  }

  async saveUserAndPass(username, password) {
    const user = await userModel.findOne({ username });
    if (!user) return false;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return true;
  }

  
  async updateUser(username, password) {
    const user = await userModel.findOne({ username });
    user.user.avatar = profile_picture;
    await user.save();
    const userObject = user.toObject();
    const userJSON = user.toJSON();
    const products = await model.find({});
  }

  // * user = {nombre, apellido, username, password, avatar}

  async createNewUser(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const createUser = await userModel.create(createUser);
    return user;
  }

  // *
  async validateUser(username, password) {
    const user = await userModel.findOne({ username });
    if (!user) return false;
    const isEqual = await bcrypt.compare(password, user.password);
    return isEqual ? user.toObject() : false;
  }
}