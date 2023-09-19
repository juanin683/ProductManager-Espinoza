import mongoose from "mongoose";
import * as cartDao from "../dao/Dao/cartsManager.dao" 


export const getAllCartsServices = async (req, res) => {
   
    let all = await cartDao.getAllCartsDao()
    if (!all) return new Error ("No se encontro el carrito elegido")
    res.send(all)
}

export const postCartsServices =  async (req, res) => {
    try {
        const postCart = await cartDao.postCartsDao()
        res.send(postCart)
    } catch (err) {
        console.log(err)
    }
}

export const cartByIdServices = async (req, res) => {
    try {
        const findCartId = await cartDao.cartByIdDao();

        res.send(findCartId);
    } catch (error) {
        console.log(error)
    }
}

export const deleteProdsByIdServices= async (req, res) => {
    try {
        const delProdsById = await cartDao.deleteProdsByIdDao();
        res.send(delProdsById)
    } catch (error) {
        console.log(error.message)
    }
}

export const updateOneProdInCartServices =  async (req, res) => {
    try {
        const updateProdCart = await cartDao.updateOneProdInCartDao();
        res.send(updateProdCart)
    } catch (error) {
        console.log(error.message)
    }

}

export const deleteOneProdInCartServices = async(req,res) => {
    try {
        const deleteProdCart = await cartDao.deleteOneProdInCartDao();
        res.send(deleteProdCart)
    } catch (error) {
        console.log(error.message)
    }
}

export const updateCartServices = async (req, res) => {
    const upCid = await cartDao.updateCartDao();
    res.send(upCid)
}