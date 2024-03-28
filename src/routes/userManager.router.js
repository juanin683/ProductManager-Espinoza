import { Router } from "express";
import passport from "passport";
import session from "express-session";
import express from "express";
import handlebars from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { JWTCookieMW } from "../utils/jwt.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
import passportMW from "../utils/passportjwt.middleware.js";
import * as users from "../controllers/users.controller.js";
import userModel from "../models/users.schema.js";

const userRouter = Router();

const protectView = (req, res, next) => {
  if (!req.session) return res.redirect("/");
  next();
};


const routerApp = express()
routerApp.engine("handlebars", handlebars.engine());
routerApp.set("views", `${__dirname}/views`);
routerApp.set("view engine", "handlebars");




userRouter.get("/", async(req, res) => {
  res.render("msjWelcome")
});

userRouter.get('/login', (req, res) => {
  const cookie = req.cookies["coderCookieToken"];
  console.log(cookie);
  if (cookie) {
      const user = jwt.verify(cookie,process.env.PRIVATE_KEY);
      if (user) {
        req.user = user
        res.redirect('/products');
      }
  } else {
      res.render('login');
  }
});

userRouter.post("/login", users.postLoginUser);

userRouter.get("/products", JWTCookieMW, async (req, res) => {
  let prodsInLogin = await prodmanager.getProducts();

  res.render("allproducts", { allProducts: prodsInLogin });
});


// userRouter.post("/register", users.postRegisterUser);


userRouter.get("/prem/:uid", async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await userModel.findById(userId);

    if (user.role == "user") {
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { role: "premium" },
        { new: true }
      );
      await updatedUser.save();
      res.render("role cambiado", {
        message: "El usuario ahora tiene rol de: " + updatedUser.role,
      });
    } else if (user.role == "premium") {
      const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { role: "user" },
        { new: true }
      );
      await updatedUser.save();
      console.log(updatedUser.role + " hola 2");
      res.render("role_cambiado", {
        message: "El usuario ahora tiene role de: " + updatedUser.role,
      });
    } else {
      return res.status(400).json({ error: "Rol no válido" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

userRouter.use(passportMW("jwt"));

userRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {}
);

userRouter.get(
  "/callback",
  passport.authenticate("github", {
    failureRedirect: "/home",
    successRedirect: "/products",
  }),
  (req, res) => {}
);
userRouter.get("/profile", users.getProfile);

userRouter.get("/current", users.getCurrent);

userRouter.post("/recoverpassword", async (req, res) => {
  const { email, password } = req.body;

  const result = await userManager.saveUserAndPass(email, password);
  res.send({ result });
});

userRouter.get("/logout", protectView, async (req, res) => {
  req.session.destroy((er) => {
    res.send("the session has expired");
  });
});
export default userRouter;
