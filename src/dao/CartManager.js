import mongoose from "mongoose";
import cartModel from "../models/carts.schema.js";
import ProductManager from "./ProductManager.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url))

const pm = new ProductManager()

export default class CartManager {
  constructor() {}


loadDataCart = async () => {
  let cartProduct = await cartModel.find();
  return cartProduct;
  };

getCartById = async ({_id: cid} ) => {
  try {
    const cartById = await cartModel.findById(cid).populate("products.product").lean();
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


addProductInCartById = async (cidCart, productById) => {

  try {
    const filter = { _id: cidCart, "products._id": productById._id };
    const cart = await cartModel.findById(cidCart).lean();

    if (cart.products.find(p => p._id == productById._id)) {
      const update = { $inc: { "products.$.quantity": productById.quantity } };
      await cartModel.findOneAndUpdate(filter, update);
    } else {
      const update2 = { $push: { "products": { _id: productById._id, quantity: productById.quantity } } };
      await cartModel.findOneAndUpdate({ _id: cidCart }, update2);
    }

    return await cartModel.findById(cidCart);
  } catch (err) {
    if (!cidCart) return "Cart Not Found";
    if (!productById) return "Product Not Found";
    console.log('Could not add product in the cart', err.message);
  }

}


deleteProdInCart = async (cartId,productId) => {

  //  try {
  //    const cartWithProdId = await cartModel.findById(cartId)
  //    const prodInCart = await cartModel.findById(productId).lean();
  //    if (cartWithProdId.find(prodInCart)) {
  //     const deleteProd = await cartModel.findByIdAndDelete(prodInCart)
      
  //     return deleteProd;
  //    }
    
    
  //   } catch (err) {
  //       console.error('could not delete product in cart:', err.message);
  //       return err;
  //   }
  try {
    return await cartModel.findOneAndDelete(
        { _id: cartId },
        { productId},
        { new: true })

  } catch (err) {
      return err
  }

};


updateCart = async (cartUpId,productId) => {

  try {
    const up = await cartModel.findById(cartUpId);
    const prods = await cartModel.findById(productId);

    const updated = await cartModel.findOneAndUpdate(cartUpId, productId,{ upsert: true, new: true, rawResult: true });

    const cart = await cartModel.updateOne({ _id: { $eq: cartUpId } }, { productId:[] });
   


  return {
    ...updated,
    ...cart,
  };
  } catch (error) {
      console.log(error);
      return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
  }

  // try {
  //     const up = { "cartId": { _id: productId._id, quantity: productId.quantity++ } } ;
  //     await cartModel.findOneAndUpdate({ _id: upCart }, up);
  
  //     const created = await cartModel.create({ $push: { "cartId": { _id: productId._id, quantity: productId.quantity } } })
    
  //   return deleteProd;
  //   } catch (err) {
  //       console.error('could not update cart:', err.message);
  //       return err;
  //   }
};

updateProdInCart = async (upCartCid,uProductPid) => {
  
  
  
    try {
      await cartModel.findOne({ _id: upCartCid },{uProductPid})
      return await cartModel.updateOne(
        { _id: upCartCid },
        [] )
        
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




