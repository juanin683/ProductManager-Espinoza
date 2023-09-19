import mongoose from "mongoose";
import * as cartDao from "../dao/Dao/cartsManager.dao" 


export const getAllCarts = async (req, res) => {
   
    let all = await cartDao.getAllCarts()
    if (!all) return new Error ("No se encontro el carrito elegido")
    res.send(all)
}

export const postCarts =  async (req, res) => {
    try {
        const postCart = await cartDao.postCarts()
        res.send(postCart)
    } catch (err) {
        console.log(err)
    }
}

export const cartById = async (req, res) => {
    try {
        const findCartId = await cartDao.cartById();

        res.send(findCartId);
    } catch (error) {
        console.log(error)
    }
}

export const deleteProdsById = async (req, res) => {
    try {
        const delProdsById = await cartDao.deleteProdsById();
        res.send(delProdsById)
    } catch (error) {
        console.log(error.message)
    }
}

export const updateOneProdInCart =  async (req, res) => {
    try {
        const updateProdCart = await cartDao.updateOneProdInCart();
        res.send(updateProdCart)
    } catch (error) {
        console.log(error.message)
    }

}

export const deleteOneProdInCart = async(req,res) => {
    try {
        const deleteProdCart = await cartDao.deleteOneProdInCart();
        res.send(deleteProdCart)
    } catch (error) {
        console.log(error.message)
    }
}

export const updateCart = async (req, res) => {
    const upCid = await cartDao.updateCart();
    res.send(upCid)
}