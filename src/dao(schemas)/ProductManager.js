import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import prodModel from "../models(schemas)/products.schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

mongoose.connect(`mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/products?retryWrites=true&w=majority`);

export default class ProductManager {
  constructor() {
  }


loadData = async () => {
  try {
    const prods = await prodModel.find();
    return prods
  } catch (err) {
    return [];
  }
};

addProducts = async (prods) => {
  try {
  const product = await prodModel.insertOne([prods]);

  return product;
  } catch (error) {
    console.log(error);
  }
};

getProducts = async () => {
  const p = await prodModel.find();
  return p;
};

getProductById = async (id) => {
  const misProductos = prodModel.findById({id});
  return !misProductos ? "NOT FOUND" : misProductos;
};

deleteProduct = async (pid) => {
  let deleteProductId = prodModel.findByIdAndDelete((product) => product.id === pid);
  if (!deleteProductId) {
    return `No se ha encontrado ese producto con id ${pid}`;
  }

// let deleteProd = this.products.filter((p) => p.id !== pid);

// await fs.promises.writeFile(this.path, JSON.stringify(deleteProd, null, 2));
};

updateProduct = async (id, product) => {
let productOld = prodModel.findByIdAndUpdate( product.id === id);

if (!productOld) {
  return `No se ha encontrado ese producto con id ${id}`;
}

let update = prodModel.findOneAndUpdate((p) => {
  if (p.id === id) {
    return { ...p, ...product };
  }
  return update;
});
// await fs.promises.writeFile(this.path, JSON.stringify(update, null, 2));
};
}

