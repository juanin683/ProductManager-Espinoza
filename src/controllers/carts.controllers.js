
import __dirname from "../config/multer.js"

import * as cartServices from "../services/cart.services.js"
// const shopingCart = new CartManager;
// const pm = new ProductManager()

export const getCartsController = async (req, res) => {
    const readCarts = await cartServices.getAllCartsServices()
    res.send(readCarts)
}

export const postCartsController =  async (req, res) => {
    const writeCart = await cartServices.postCartsServices();
    res.send(writeCart)

}

export const cartByIdController = async (req, res) => {
    const result = await cartServices.cartByIdServices()
    res.send(result)
}

export const deleteProdsInCartController = async (req, res) => {
    const delProdsInCart = await cartServices.deleteProdsByIdServices()
    res.send(delProdsInCart)
}

export const updateOneProdInCartController =  async (req, res) => {
    const updateProdInCart = await cartServices.updateOneProdInCartServices();
    res.send(updateProdInCart)

}

export const deleteOneProdInCartController = async (req, res) => {
    const deleteProdCart = await cartServices.deleteOneProdInCartServices();
    res.send(deleteProdCart)

}

export const updateCart = async (req, res) => {
    let updateCartSelected = await cartServices.updateCartServices();
    res.send(updateCartSelected)
}