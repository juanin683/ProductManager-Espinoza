import { Router } from "express";
import passportMW from "../utils/passportjwt.middleware.js";
import protectBy from "../utils/protectUser.middleware.js";
import * as users  from "../controllers/users.controller.js";
import userModel from "../models/users.schema.js"

const router = Router();

router.post("/login",users.postLoginUser );

router.post("/register",users.postRegisterUser);

router.get('/users/premium/:uid', async (req, res) => {
    const userId = req.user._id

    try {
        const user= await userModel.findById(userId)

        if(user.role =='user'){
            const updatedUser= await userModel.findOneAndUpdate(
                {_id:userId},
            { role: 'premium'},
            { new: true }
        );
        await updatedUser.save();
        res.render('role cambiado', {
            message:"El usuario ahora tiene rol de: " + updatedUser.role
        });
    }else if(user.role=='premium'){
        const updatedUser=await userModel.findOneAndUpdate(
            {_id:userId},
            { role: "user" },
            { new: true }
        );
        await updatedUser.save();
        console.log(updatedUser.role+" hola 2")
        res.render('role_cambiado', {
            message:"El usuario ahora tiene role de: " + updatedUser.role
        })

    } else{
        return res.status(400).json({ error: 'Rol no válido' });
    }


    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.use(passportMW("jwt"));
router.use(protectBy("admin"));

router.get("/profile",users.getProfile);

router.get("/current", users.getCurrent);

export default router;
