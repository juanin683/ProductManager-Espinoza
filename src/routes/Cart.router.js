import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import __dirname from "../config/multer.js"
import CartManager from "../dao/mongo/CartManager.js"
import * as cartsManager from "../controllers/carts.controllers.js"


// const pm = new ProductManager()
const appCm = express()

const Cart = Router()

Cart.get('/', cartsManager.getCarts )

Cart.post('/', cartsManager.postCarts)

Cart.get('/:cid', cartsManager.cartById)

Cart.delete('/:cid', cartsManager.deleteProdsInCart)

Cart.put('/:cid/product/:pid',cartsManager.updateOneProdInCart)

Cart.delete('/:cid/product/:pid', cartsManager.deleteOneProdInCart);

Cart.put('/:cid',cartsManager.updateCart)

export default Cart;