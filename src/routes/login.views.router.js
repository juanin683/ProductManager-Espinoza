import express from "express";
import { Router } from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import UserManager from "../dao/mongo/usersManager.js";
import { isLogged, protectView } from "../utils/protectUser.middleware.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loginApp = express();
const loginViewsRouter = Router();
const userManager = new UserManager();

loginApp.engine("handlebars", handlebars.engine());
loginApp.set("views", `${__dirname}/views`);
loginApp.set("view engine", "handlebars");

// * Login
loginViewsRouter.get("/", isLogged, (req, res) => {
  res.render("login");
});

loginViewsRouter.post("/",async (req, res) =>
  res.redirect ("/products")
  
)


loginViewsRouter.get("/logout", protectView, async (req, res) => {
  req.session.destroy((er) => {
    res.send("the session has expired");
  });
});

loginViewsRouter.get("/products", protectView, (req, res) => {
  // const { name, lastname, username } = req.user;
  // res.render("profile", { name, lastname, username });
  res.render("allproducts")
});

loginViewsRouter.get("/register",async (req, res) => {
  res.render("register");
});

loginViewsRouter.post("/register",async (req, res) => {
  const { name, lastname, username, password } = req.body;

  const user = await userManager.createNewUser({
    name,
    lastname,
    username,
    password,
    email,
    role: username == "admincoder@coder.com" ? 'admin' : 'user'
  });
  console.log(user)
  res.redirect("/products");
});


loginViewsRouter.post("/recoverPassword", async (req, res) => {
  const { username, password } = req.body;

  const result = await userManager.saveUserAndPass(username, password);
  res.send({ result });
});

export default loginViewsRouter;