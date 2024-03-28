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
    //  req.email = req.userLogin.email
    //  req.role = req.userLogin.role
    const {email,password} = req.body;
     const userLogin = await userServices.postLogin(email,password)
    
     const tokenSigned = jwt.sign(
      { user: userLogin, sub: userLogin._id },
      "SUPERSECRET"
    );

    res.cookie("secretToken", tokenSigned, {
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
     successRedirect: "/login",
     failureRedirect: "/",
   }, async(req, res) => { 
     try {
       console.log(req.body);
       const { name, lastname, age, email, password } = req.body;

       const userLogin = await userServices.createUser({
         name,
         lastname,
         age,
         password,
         email,
         role: username == "admincoder@coder.com" ? 'admin' : 'userLogin'
       });
       console.log(userLogin)
     } catch (error) {
       res.send(error.message)
     }
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

