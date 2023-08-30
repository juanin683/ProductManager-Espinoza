import express from "express";
import session from "express-session";
import { Router } from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import UserManager from "../dao/mongo/usersManager.js";
import ProductManager from "../dao/mongo/ProductManager.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loginApp = express();
const loginViewsRouter = Router();
const userManager = new UserManager();
const prodmanager = new ProductManager();

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
  res.render("login")
});

loginViewsRouter.post("/",passport.authenticate("login", {
  successRedirect: "/products",
  failureRedirect: "/",
}),
async (req, res) => {}
)


loginViewsRouter.get("/logout", protectView, async (req, res) => {
  req.session.destroy((er) => {
    res.send("the session has expired");
  });
});

 loginViewsRouter.get("/products", protectView, async(req, res) => {
  let prodsInLogin = await prodmanager.getProducts();

  res.render("allproducts", {allProducts: prodsInLogin})
  
 });

loginViewsRouter.get("/register",async (req, res) => {
  res.render("register");
});

loginViewsRouter.post("/register",passport.authenticate("register", {
  successRedirect: "/products",
  failureRedirect: "/register",
}),
async (req, res) => {})
// );async (req, res) => {
//   const { name, lastname, username, password } = req.body;

//   const user = await userManager.createNewUser({
//     name,
//     lastname,
//     username,
//     password,
//     email,
//     role: username == "admincoder@coder.com" ? 'admin' : 'user'
//   });
//   console.log(user)
//   res.redirect("/login");
// });


loginViewsRouter.post("/recoverpassword", async (req, res) => {
  const { username, password } = req.body;

  const result = await userManager.saveUserAndPass(username, password);
  res.send({ result });
});



export default loginViewsRouter;