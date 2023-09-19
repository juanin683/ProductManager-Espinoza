import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import __dirname from "../config/multer.js"
import CartManager from "../dao/mongo/CartManager.js"
import * as cartsManager from "../controllers/carts.controllers.js"


// const pm = new ProductManager()
const appCm = express()

const Cart = Router()

Cart.get('/', cartsManager.getCartsController )

Cart.post('/', cartsManager.postCartsController)

Cart.get('/:cid', cartsManager.cartByIdController)

Cart.delete('/:cid', cartsManager.deleteProdsInCartController)

Cart.put('/:cid/product/:pid',cartsManager.updateOneProdInCartController)

Cart.delete('/:cid/product/:pid', cartsManager.deleteOneProdInCartController);

Cart.put('/:cid',cartsManager.updateCart)

export default Cart;