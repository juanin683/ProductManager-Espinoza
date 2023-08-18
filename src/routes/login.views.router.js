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

loginViewsRouter.post("/login", {
    successRedirect: "/profile",
    failureRedirect: "/login",
}),async (req, res) => {}
  


loginViewsRouter.get("/logout", protectView, async (req, res) => {
  req.session.destroy((er) => {
    res.send("the session expired");
  });
});

loginViewsRouter.get("/profile", protectView, (req, res) => {
  const { name, lastname, username } = req.user;
  res.render("profile", { name, lastname, username });
});

loginViewsRouter.post(
  "/register",
  async (req, res) => {}
);

loginViewsRouter.post("/recoverPassword", async (req, res) => {
  const { username, password } = req.body;

  const result = await userManager.saveUserAndPass(username, password);
  res.send({ result });
});

export default loginViewsRouter;