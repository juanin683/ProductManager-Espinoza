//loginviewsrouter

// import express from "express";
// import { Router } from "express";
// import handlebars from "express-handlebars";
// import passport from "passport";
// import UserManager from "../dao/mongo/usersManager.js";
// import { isLogged, protectView } from "../utils/protectUser.middleware.js";

// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const loginApp = express();
// const loginViewsRouter = Router();
// const userManager = new UserManager();

// loginApp.engine("handlebars", handlebars.engine());
// loginApp.set("views", `${__dirname}/views`);
// loginApp.set("view engine", "handlebars");

// // * Login
// loginViewsRouter.get("/", isLogged, (req, res) => {
//   res.render("login");
// });

// loginViewsRouter.post("/",
//   passport.authenticate("login", {
//     successRedirect: "/profile",
//     failureRedirect: "/login",
//   }),
//   async (req, res) => {})


// loginViewsRouter.get("/logout", protectView, async (req, res) => {
//   req.session.destroy((er) => {
//     res.send("the session has expired");
//   });
// });

// loginViewsRouter.get("/products", protectView, (req, res) => {
//   // const { name, lastname, username } = req.user;
//   // res.render("profile", { name, lastname, username });
//   res.render("allproducts")
// });

// loginViewsRouter.get("/register",async (req, res) => {
//   res.render("register");
// });

// loginViewsRouter.post("/register",async (req, res) => {
    // "/register",
    // passport.authenticate("register", {
    //   successRedirect: "/profile",
    //   failureRedirect: "/register",
    // }),
    // async (req, res) => {res.redirect("/products");}
//   
// });


// loginViewsRouter.post("/recoverPassword", async (req, res) => {
//   const { username, password } = req.body;

//   const result = await userManager.saveUserAndPass(username, password);
//   res.send({ result });
// });

// export default loginViewsRouter;


//usermanager
// import mongoose from "mongoose";
// import userModel from "../../models/users.schema.js";
// import bcrypt from "bcrypt";
// import { SpeakerPhone } from "@mui/icons-material";


// export default class UserManager {
//   constructor() {}

// async getUsers() {
  
//   try {
//     const users = await userModel.find().lean();
  
//     return users;
    
//   } catch (error) {
//     return []
//   }
// }

// async getUsersByUsername(username) {
//   try {
//     return await userModel.findOne({ username });
//   } catch (error) {
//     console.log(error)
//   }
// }

// async saveUserAndPass(username, password) {
//   const userAndPass = await userModel.find({ username,password });
//   if (!userAndPass) return false;

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//   await userAndPass.save();
//   console.log(userAndPass)
// }

// async updateUser(username) {
 
// try {
//   const user = await userModel.findOne({ username});
//   // user.user.avatar = profile_picture;
//  await user.save();
// } catch (error) {
//   console.log(error.message)
// }
// }

// async createNewUser(user) {
//   user.salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//    await userModel.create(user);
//   const createUser = await userModel.insertMany([user]);

//   return createUser;
// }

// async validateUser(username, password) {
//   const user = await userModel.findOne({ username });
//   if (!user) return false;
//   const isEqual = await bcrypt.compare(password, user.password);
//   return isEqual ? user.toObject() : false;
// }

// }

//app
// app.use(passport.initialize())
// app.use(passport.session())
