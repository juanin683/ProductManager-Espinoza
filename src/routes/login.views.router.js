import express from "express";
import { Router } from "express";
import handlebars from "express-handlebars";
import passport from "passport";
import UserManager from "../dao/mongo/usersManager.js";
import ProductManager from "../dao/mongo/ProductManager.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { JWTCookieMW } from "../utils/jwt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const loginApp = express();
const loginViewsRouter = Router();
const userManager = new UserManager();
const prodmanager = new ProductManager();

loginApp.engine("handlebars", handlebars.engine());
loginApp.set("views", `${__dirname}/views`);
loginApp.set("view engine", "handlebars");

//middlewares

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




 loginViewsRouter.get("/products", JWTCookieMW, async(req, res) => {
   let prodsInLogin = await prodmanager.getProducts();

   res.render("allproducts", {allProducts: prodsInLogin})
  
  });

 loginViewsRouter.get("/register",async (req, res) => {
   res.render("register");
 });

//  loginViewsRouter.post("/register",passport.authenticate("register", {
//    successRedirect: "/",
//    failureRedirect: "/",
//  }),
//  async (req, res) => {

//  })


export default loginViewsRouter;