import mongoose from "mongoose";
import cartModel from "../models/products.schema";


export default class CartManager {
  constructor() {}


  loadDataCart = async () => {
    let cartProduct = await cartModel.find();
    return cartProduct;
    };

  addCart = async (cartProduct) => {
  
   let prodInCart = await cartModel.insertMany[{cartProduct}]
  return prodInCart;
  };

  getCartById = async (id) => {
    try {
      const cartById = await cartModel.findById({id})
    return cartById;
    } catch (err) {
      console.log(err)
    }
  };

  addProductInCartById = async (cidCart, productById) => {
    if (!cidCart) return "Cart Not Found";
    if (!productById) return "Product Not Found";

    let update = this.cart.map((cart) => {
      if (cart.id === cidCart) {
        if (!cidCart.products.some((product) => product.id === productById)) {
          let productInCart = cart.products.push({
            id: productById,
            quantity: 1,
          });

          return {
            ...cart,
            ...productInCart,
          };
        }

        cart.products.map((p) => {
          if (p.id === productById) {
            return ++p.quantity;
          }
          return p;
        });
      }
      return cart;
    });

    await this.writeCart(update);

    return "Product added to cart succesfully";
  };
}
