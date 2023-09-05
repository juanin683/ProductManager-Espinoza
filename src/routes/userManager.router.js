import { Router } from "express";
import passport from "passport";
import UserManager from "../dao/mongo/usersManager.js";
import { generateToken } from "../utils/jwt.js";
import passportMW from "../utils/passportjwt.middleware.js";
import protectBy from "../utils/protectUser.middleware.js"

const router = Router();
const User = new UserManager();


router.post("/login", async (req, res) => {
  console.log(req.body);

  const user = await User.validateUser(req.body.email, req.body.password);
  if (!user) return res.send({ error: true });

  const tokenSigned = generateToken({
    sub: user._id,
    user: { email: user.email },
  });

  res.cookie("accessToken", tokenSigned, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.send({ error: false, accessToken: tokenSigned });
});

router.use(passportMW("jwt"));
router.use(protectBy("admin"));

router.get("/profile", (req, res) => {
  
  if (req.user.role == "admin") {
    res.send({ error: false, user: req.user });
  } else {
    res.send({ error: true, msg: "Rol Invalido" });
  }
});

router.get("/profile", passportMW("jwt")  , protectBy("admin"), (req, res) => {
  
  if (req.user.role == "admin") {
    res.send({ error: false, user: req.user });
  } else {
    res.send({ error: true, msg: "Rol Invalido" });
  }
});
export default router;