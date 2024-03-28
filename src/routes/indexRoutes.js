import { Router } from "express";
import  ProductManagerRouter from "./ProductManager.router.js";
import Cart from "./Cart.router.js";
import productsViewsRouter from "./products.views.router.js"
import userRouter from "./userManager.router.js";
import sessionsRouter from './sessionsRoutes.js'
import loggerRouter from "./loggerTest.js"
// import purchaserouter from "./mailPurchaseRoutes.js"
// import mockingRouter from "./mocking.js"
import { userAdminControl } from "../utils/protectUser.middleware.js"
import userModel from "../models/users.schema.js";
const router = Router();

router.use('/',userRouter);
router.use('/api/carts', Cart)
router.use('/api/products', ProductManagerRouter);
router.use('/products', productsViewsRouter);
router.use('/api/sessions', sessionsRouter); 
// router.use('/sendMailPurchase', purchaserouter); 
// router.use('/mockingproducts', mockingRouter);
// router.use('/api/loggers', loggerRouter)

// router.use("/chat",userAdminControl, (req,res)=>{
//     res.render("chat")
// })



export default router;