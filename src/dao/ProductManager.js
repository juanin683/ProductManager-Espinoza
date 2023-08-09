import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import prodModel from "../models/products.schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class ProductManager {
  constructor() {
  }


loadData = async () => {
  try {
    const prods = await prodModel.find();
    prods.toObject()
    prods.save()
    return prods
  } catch (err) {
    return [];
  }
};

addProducts = async (prods) => {
  try {
  const product = await prodModel.insertMany([prods]);

  return product;
  } catch (error) {
    console.log(error);
  }
};

getProducts = async () => {
  try {
    const p = await prodModel.find();
  return p;
  } catch (error) {
    console.log(error)
  }
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

};
}

