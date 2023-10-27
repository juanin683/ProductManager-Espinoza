import mongoose from "mongoose";
import cartModel from "../../models/carts.schema.js";
import prodModel from "../../models/products.schema.js"
import userModel from "../../models/users.schema.js"

import ProductManager from "./ProductManager.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url))

const pm = new ProductManager()

export default class CartManager {
  constructor() { }


  loadDataCart = async () => {
    let cartProduct = await cartModel.find();
    return cartProduct;
  };

  getCartById = async (cid) => {
    try {
      const cartById = await cartModel.findById(cid);
      return cartById;
    } catch (err) {
      console.log(err)
    }
  };

  addCart = async (cartId) => {
    try {
      let cartData = {};
      if (cartId && cartId.length > 0) {
        cartData.cartId = cartId;
      }

      const cart = await cartModel.create(cartData);
      return cart;
    } catch (err) {
      console.error('could not add cart:', err.message);
      return err;
    }
  };


  addProductInCartById = async (cidCart, productById,userId) => {

    try {
      const filter = { _id: cidCart, "products._id": productById._id };
      const product= await prodModel.findById(productById)
      const cart = await cartModel.findById(cidCart).lean();
      const user = await userModel.findById(userId);
      if (cart.products.find(p => p._id == productById._id)) {
        const update = { $inc: { "products.$.quantity": productById.quantity } };
        await cartModel.findOneAndUpdate(filter, update);
      } else {
        const update2 = { $push: { "products": { _id: productById._id, quantity: productById.quantity } } };
        await cartModel.findOneAndUpdate({ _id: cidCart }, update2);
      }
      if (product.owner == user.email && user.role == 'premium'){
        return { message: "Usted no puede agregar su propio producto a carrito." };
    }

      return await cartModel.findById(cidCart);
    } catch (err) {
      if (!cidCart) return "Cart Not Found";
      if (!productById) return "Product Not Found";
      console.log('Could not add product in the cart', err.message);
    }

  }


  deleteProdsInCart = async (cartId, productId) => {
    console.log(productId)
    try {
      return await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { _id: productId } } },
        { new: true })

    } catch (err) {
      return err
    }

  };


  updateProdincart = async (upCartCid, listProds) => {

    try {

      return await cartModel.updateMany({ "_id": upCartCid }, { "$set": { "products": listProds.products } });

    } catch (error) {

      console.log(error)

    }

  }


  deleteAllProdsInCart = async (delCart) => {

    try {

      const cart = await cartModel.findById(delCart);
      cart.products = [];
      await cart.save();
      return cart;

    } catch (err) {
      console.error('could not delete products in cart:', err.message);
      return err;
    }
  };



}




