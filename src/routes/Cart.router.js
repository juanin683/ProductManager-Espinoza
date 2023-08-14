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
        
        res.send({ idCart});
    } catch (error) {
        console.log(error)
    }
})

Cart.put('/:cid',async(req,res) => {
    
    let cartUpId = req.params.cid;
    let productId = req.body;
    res.send(
        await shopingCart.updateCart(cartUpId,productId)
    )

});

Cart.delete('/:cid',async(req,res) => {
    let delCartCid = req.params.cid;
    const cart = await shopingCart.getCartById(delCartCid);
    cart.products = [];
    if (!cart) {
        return res.status(404).send({ message: `Cart with ID: ${delCartCid} not found` });
      }

    await shopingCart.updateProdInCart(delCartCid, cart.products);

    return res.status(200).send({
        status: 'success',
        message: `The cart with ID: ${delCartCid} was emptied correctly`,
        cart: cart,
    });

})

Cart.post('/:cid/product/:pid',async(req,res) => {
    
    let cidCart = req.params.cid;
    let productById = req.params.pid;
    let { quantity } = req.body;
    res.send(
        await shopingCart.addProductInCartById(cidCart, { _id: productById, quantity: +quantity })
    )

})


Cart.delete('/:cid/product/:pid',async(req,res) => {
    try {
        const { cid, pid } = req.params;
        const checkCart = await shopingCart.getCartById(cid);
        const findbyIndex = checkCart.products.findIndex((product) => product._id === pid);
        
        if (findbyIndex === -1) {
            return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found in cart` });
        }
  
        checkCart.products.splice(findbyIndex, 1);
  
        const updatedCart = await shopingCart.deleteProdInCart(cid, checkCart.products);
  
        return res.status(200).send({ status: 'success', message: `Deleted product with ID: ${pid}`, cart: updatedCart });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
    }
  });
  



Cart.put('/:cid/product/:pid',async(req,res) => {
    
    let upCartCid = req.params.cid;
    let uProductPid = req.params.pid;
    res.send(
        await shopingCart.updateProdInCart({_id:upCartCid}, {uProductPid})
    );

})

export default Cart;