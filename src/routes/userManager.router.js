import { Router } from "express";
import passportMW from "../utils/passportjwt.middleware.js";
import protectBy from "../utils/protectUser.middleware.js";
import * as users  from "../controllers/users.controller.js";

const router = Router();

router.post("/login",users.postLoginUser );

router.post("/register",users.postRegisterUser);

router.use(passportMW("jwt"));
router.use(protectBy("admin"));

router.get("/profile",users.getProfile);

router.get("/current", users.getCurrent);

export default router;
