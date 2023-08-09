// import fs from "fs";


// export default class CartManager {
//   constructor() {
//     this.path = "./src/db/cart.json";
//     this.cart = [];
//     this.loadDataCart();
//   }
//   #id = 0;

//   loadDataCart = async () => {
//     let cartProduct = await fs.promises.readFile(this.path, "utf8");
//     const cartInFile = JSON.parse(cartProduct);

//     this.cart = cartInFile;

//     if (cartInFile.length === 0) {
//       this.#id = 1;
//     } else {
//       this.#id = cartInFile[cartInFile.length - 1].id + 1;
//     }
//   };

//   writeCart = async (cartProduct) => {
//     await fs.promises.writeFile(this.path, JSON.stringify(cartProduct));
//   };

//   addCart = async () => {
//     //  let add = await this.loadDataCart()

//     let prodInCart = [{ id: this.#id++, products: [] }];

//     this.cart.push({
//       ...prodInCart,
//     });
//     await this.writeCart(prodInCart);
//   };

//   getCartById = async (id) => {
//     const misProductosId = JSON.parse(
//       await fs.promises.readFile(this.path, "utf8")
//     ).find((prod) => prod.id === id);
//     return !misProductosId ? "NOT FOUND" : misProductosId;
//   };

//   addProductInCartById = async (cidCart, productById) => {
//     if (!cidCart) return "Cart Not Found";
//     if (!productById) return "Product Not Found";

//     let update = this.cart.map((cart) => {
//       if (cart.id === cidCart) {
//         if (!cidCart.products.some((product) => product.id === productById)) {
//           let productInCart = cart.products.push({
//             id: productById,
//             quantity: 1,
//           });

//           return {
//             ...cart,
//             ...productInCart,
//           };
//         }

//         cart.products.map((p) => {
//           if (p.id === productById) {
//             return ++p.quantity;
//           }
//           return p;
//         });
//       }
//       return cart;
//     });

//     await this.writeCart(update);

//     return "Product added to cart succesfully";
//   };
// }
