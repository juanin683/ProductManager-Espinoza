import { Router } from "express";
import CartManager from "../dao/CartManager.js"
import ProductManager from "../dao/ProductManager.js";
import express from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js"


const shopingCart = new CartManager;
const pm = new ProductManager()
const appCm = express()

const Cart = Router()
appCm.engine("handlebars", handlebars.engine())
appCm.set('views', `/src/views`)
appCm.set("view engine", 'handlebars')


Cart.get('/',async(req,res) => {
    let readCart = parseInt(req.query.readCart);
    let all = await shopingCart.loadDataCart(readCart)
    res.send(all)
})

Cart.post('/',async(req,res) => {
    try {
        const body = req.body;

        let postCart = await shopingCart.addCart(body)
        res.send({ postCart })
    } catch (err) {
        console.log(err)
    }
})

Cart.get('/:cid',async(req,res) => {
    
    try {
        let cid = req.params.cid;
        let idCart = await shopingCart.getCartById(cid)
        res.send({idCart})
    } catch (error) {
        console.log(error)
    }
})

Cart.post('/:cid/product/:pid',async(req,res) => {
    let cidCart = req.params.cid;
    let productById = +req.params.pid;
    let quantity = +req.body;
    res.send(
        await shopingCart.addProductInCartById(cidCart, { _id: productById, quantity:quantity })
    )

})

export default Cart;