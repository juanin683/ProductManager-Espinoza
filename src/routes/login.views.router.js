import express from "express";
import { Router } from "express";
import handlebars from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import UserManager from "../dao/mongo/usersManager.js";
import { isLogged, protectView } from "../utils/protectUser.middleware.js";

const loginViewsRouter = Router();
const userManager = new UserManager();

// * Login
loginViewsRouter.get("/login", isLogged, (req, res) => {
  res.render("login");
});

loginViewsRouter.post("/login",async (req, res) =>
  res.redirect ("/products")
  
)


loginViewsRouter.get("/logout", protectView, async (req, res) => {
  req.session.destroy((er) => {
    res.send("the session expired");
  });
});

loginViewsRouter.get("/products", protectView, (req, res) => {
  // const { name, lastname, username } = req.user;
  // res.render("profile", { name, lastname, username });
  res.render("allproducts")
});

loginViewsRouter.post("/register",async (req, res) => {
  const { name, lastname, username, password } = req.body;

  const user = await userManager.createNewUser({
    name,
    lastname,
    username,
    password,
    role: username == "admincoder@coder.com" ? 'admin' : 'user'
  });
  res.redirect("/products");
});

loginViewsRouter.get("/register",async (req, res) => {
  res.render("register")
});

loginViewsRouter.post("/recoverPassword", async (req, res) => {
  const { username, password } = req.body;

  const result = await userManager.saveUserAndPass(username, password);
  res.send({ result });
});

export default loginViewsRouter;