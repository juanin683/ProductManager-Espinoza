
import __dirname from "../config/multer.js"

import * as cartServices from "../services/cart.services.js"
// const shopingCart = new CartManager;
// const pm = new ProductManager()

export const getCarts = async (req, res) => {
    const readCarts = await cartServices.getAllCarts()
    res.send(readCarts)
}

export const postCarts =  async (req, res) => {
    const writeCart = await cartServices.postCarts();
    res.send(writeCart)

}

export const cartById = async (req, res) => {
    const result = await cartServices.cartById()
    res.send(result)
}

export const deleteProdsInCart = async (req, res) => {
    const delProdsInCart = await cartServices.deleteProdsById()
    res.send(delProdsInCart)
}

export const updateOneProdInCart =  async (req, res) => {
    const updateProdInCart = await cartServices.updateOneProdInCart();
    res.send(updateProdInCart)

}

export const deleteOneProdInCart = async (req, res) => {
    const deleteProdCart = await cartServices.deleteOneProdInCart();
    res.send(deleteProdCart)

}

export const updateCart = async (req, res) => {
    let updateCartSelected = await cartServices.updateCart();
    res.send(updateCartSelected)
}