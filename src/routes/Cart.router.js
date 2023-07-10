import { Router } from "express";
import ProductManager from "../ProductManager.js";
import CartManager from "../CartManager.js"



const shopingCart = new CartManager
const Cart = Router()

Cart.post('/',async(req,res) => {
    let readCart = parseInt(req.query.readCart);
    let all = await shopingCart.addCart(readCart)
    res.send(all)
})

Cart.get('/:cid',async(req,res) => {
    let cid = parseInt(req.params.cid);
    let idCart = await shopingCart.getCartById(cid)
    res.send(idCart)
})

Cart.post('/:cid/product/:pid',async(req,res) => {
    let cidCart = req.params.cid
    let productById = req.params.pid
    res.send(await shopingCart.addProductInCartById(cidCart,productById))

})

export default Cart