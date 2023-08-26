import express from "express";
import session from "express-session";
import { Router } from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import UserManager from "../dao/mongo/usersManager.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loginApp = express();
const loginViewsRouter = Router();
const userManager = new UserManager();

loginApp.engine("handlebars", handlebars.engine());
loginApp.set("views", `${__dirname}/views`);
loginApp.set("view engine", "handlebars");

//middlewares
const protectView = (req, res, next) => {
  if (!req.session) return res.redirect("/login");
  next();
};
 const isLogged = (req, res, next) => {
  if (req.session) return res.redirect("/products");
  next(); 
};



// * Login
loginViewsRouter.get("/", async(req, res) => {
  res.render("login");
});

loginViewsRouter.post("/",isLogged, async (req, res) =>
 {
res.redirect("/products")
 }
  
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
  res.redirect("/login");
});


loginViewsRouter.post("/recoverPassword", async (req, res) => {
  const { username, password } = req.body;

  const result = await userManager.saveUserAndPass(username, password);
  res.send({ result });
});


loginViewsRouter.get("/github",  passport.authenticate('github',{scope:["user:email"]}),(req,res)=>{});

loginViewsRouter.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/products",
  }),
  (req, res) => {}
);
export default loginViewsRouter;