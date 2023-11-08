import passport from "passport";
import cookieParser from "cookie-parser";
import { generateToken } from "../utils/jwt.js";
import * as userServices from "../services/users.services.js"
import passportMW from "../utils/passportjwt.middleware.js";
import protectBy from "../utils/protectUser.middleware.js";


export const postLoginUser = async (req, res) => {
  try {
    // const user = await User.validateUser(req.body.email, req.body.password);
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
}

export const postRegisterUser = passport.authenticate("register",{
    successRedirect: "/",
    failureRedirect: "/",
  }, async(req, res) => {
    console.log(req.body);
  
  }
)

export const getProfile =  async (req, res) => {
    const profile = await userServices.getProfile()
    res.send(profile)
  }

export const getCurrent = ( passportMW("jwt"),protectBy("admin"),async (req, res) => {
    const c = await userServices.getCurrentRole();
    res.send(c)
})

