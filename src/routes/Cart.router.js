import { Router } from "express";
import CartManager from "../dao/ProductManager.js"



const shopingCart = new CartManager;
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
    let cidCart = +req.params.cid;
    let productById = +req.params.pid;
    res.send(
        await shopingCart.addProductInCartById(
            (await shopingCart.getCartById(cidCart)).id,
            (await pm.getProductById(productById)).id
        )
    )

})

export default Cart