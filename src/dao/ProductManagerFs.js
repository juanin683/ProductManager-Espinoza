// import fs from "fs";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import prodModel from "../models(schemas)/products.schema.js";

// const __dirname = dirname(fileURLToPath(import.meta.url))
// export default class ProductManager {
//   constructor() {
//     // this.products = [];
//     // this.path = "./src/db/products.json";
//     // this.loadData();
//   }

  
//   loadData = async () => {
//     try {
//       // const file = await fs.promises.readFile(this.path, "utf8");
//       // const productsInFile = JSON.parse(file);

//       // this.products = productsInFile;

//       // if (this.products.length === 0) {
//       //   this.#id = 1;
//       // } else {
//       //   this.#id = productsInFile[productsInFile.length - 1].id + 1;
//       // }

//     } catch (err) {
//       // console.log(`El archivo${this.path} no existe, creando...`);
//       // await fs.promises.writeFile(this.path, "[]");
//       return [];
//     }
//   };
//   addProducts = async (product) => {
//     try {
//       // const { title, description, price, thumbnail, code, stock, categoria } =
//       //   product;

//       // const codeExist1 = this.products.some((product) => product.code === code);
//       // if (codeExist1) {
//       //   console.log("Este codigo ya existe:", code);

//       //   return;
//       //}
    
//       // this.products.push({
//       //   id: this.#id++,
//       //   ...product,
//       // });

//        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
//        return product;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getProducts = async (prods) => {
//     return this.products;
//   };

//   getProductById = async (id) => {
//     const misProductos = this.products.find((prod) => prod.id === id);
//     return !misProductos ? "NOT FOUND" : misProductos;
//   };

//   deleteProduct = async (pid) => {
//     let deleteProductId = this.products.find((product) => product.id === pid);
//     if (!deleteProductId) {
//       return `No se ha encontrado ese producto con id ${pid}`;
//     }

//     let deleteProd = this.products.filter((p) => p.id !== pid);

//     await fs.promises.writeFile(this.path, JSON.stringify(deleteProd, null, 2));
//   };

//   updateProduct = async (id, product) => {
//     let productOld = this.products.find((product) => product.id === id);

//     if (!productOld) {
//       return `No se ha encontrado ese producto con id ${id}`;
//     }

//     let update = this.products.map((p) => {
//       if (p.id === id) {
//         return { ...p, ...product };
//       }
//       return p;
//     });
//     await fs.promises.writeFile(this.path, JSON.stringify(update, null, 2));
//   };
// }
