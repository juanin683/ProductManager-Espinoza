import mongoose from "mongoose";
// import mongoose from "mongoose-paginate-v2";
import cartModel from "../models/carts.schema.js";
import ProductManager from "./ProductManager.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url))

export default class CartManager {
  constructor() {}


loadDataCart = async () => {
  let cartProduct = await cartModel.find();
  return cartProduct;
  };

getCartById = async ({_id: cid} ) => {
  try {
    const cartById = await cartModel.findById(cid)
    return cartById;
  } catch (err) {
    console.log(err)
  }
};

addCart = async (cartProducts) => {
//  let prodInCart = await cartModel.insertMany[{cartProduct}]
// return prodInCart;
try {
  let cartData = {};
  if (cartProducts && cartProducts.length > 0) {
      cartData.products = cartProducts;
  }

  const cart = await cartModel.create(cartData);
  return cart;
  } catch (err) {
      console.error('could not add cart:', err.message);
      return err;
  }
};


addProductInCartById = async (cidCart, productById) => {

    try {
      const filter = { _id: cidCart, "products._id": productById._id };
      const cart = await cartModel.findById(cidCart._id);
      const findProduct = cart.products.toObject((product) => product._id === productById._id);

      if (findProduct) {
          const update = { $inc: { "products.$.quantity": productById.quantity } };
          await cartModel.findOneAndUpdate(filter, update);
      } else {
          const update2 = { $push: { "products": { _id: productById._id, quantity: productById.quantity } } };
          await cartModel.findOneAndUpdate({ _id: cid }, update2);
      }

      return await cartModel.findById(cid);
  } catch (err) {
    if (!cidCart) return "Cart Not Found";
    if (!productById) return "Product Not Found";
    console.log('Could not add the cart', err.message);
  
  }

}

}
