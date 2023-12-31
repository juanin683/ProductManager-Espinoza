import passport from "passport";
import cookieParser from "cookie-parser";
import { generateToken } from "../utils/jwt.js";
import * as userServices from "../services/users.services.js"
import passportMW from "../utils/passportjwt.middleware.js";
import {adminCredentials} from "../utils/protectUser.middleware.js";


export const postLoginUser =  passport.authenticate("login",{


  
},async (req, res) => {
  try {
    // res.render("login")
    req.session.email = req.user.email
    req.session.role = req.user.role
  
    const user = await userServices.postLogin()
    
    const tokenSigned = generateToken({
      sub: user._id,
      user: { email: user.email },
    });

    res.cookie("accessToken", tokenSigned, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.send({ error: false, accessToken: tokenSigned });
    res.redirect("/products");
  } catch (error) {
    res.send(error.message);
  }
})

export const postRegisterUser = passport.authenticate("register",{
    successRedirect: "/home",
    failureRedirect: "/",
  }, async(req, res) => {
   
    
    console.log(req.body);
  // const { name, lastname, age, email, password } = req.body;

  // const user = await userManager.createNewUser({
  //   name,
  //   lastname,
  //   age,
  //   password,
  //   email,
  //   role: username == "admincoder@coder.com" ? 'admin' : 'user'
  // });
  // console.log(user)
  }
)

export const getProfile =  async (req, res) => {
    const profile = await userServices.getProfile()
    res.send(profile)
  }

export const getCurrent = ( passportMW("jwt"),adminCredentials("admin"),async (req, res) => {
    const c = await userServices.getCurrentRole();
    res.send(c)
})

