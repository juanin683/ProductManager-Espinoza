import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import prodModel from "../../models/products.schema.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default class ProductManager {
  constructor() {}

loadData = async () => {
  // let doc = await prodModel.paginate(
  //   {_id: "_id"},
  //   {limit: 6,page:1}
  // );

};

addProducts = async (prods) => {
  try {
    const valid = await prodModel.findOne({ code: prods.code }).lean() // Con lean() hacemos un parse a json del objeto de mongoose.
    // VALIDADOR DE CODE
      console.log(valid)
      if (valid?.code === prods.code) {
        return "This code exists"
      }

      const product = await prodModel.insertMany([prods]);
      return product;
    } catch (error) {
      console.log(error);
    }

  try {
    const product = await prodModel.insertMany([prods]);

    return product;
  } catch (error) {
    console.log(error);
  }

};

getProducts = async () => {
  try {
    const prods = await prodModel.find().lean();
    
    return prods;
  } catch (err) {
    return [];
  }
  
};

getProductById = async (id) => {
  const misProductos = await prodModel.findById(id);
  return !misProductos ? "NOT FOUND" : misProductos;
};

deleteProduct = async (pid) => {
  let deleteProductId = await prodModel.findById(pid);
  if (!deleteProductId) {
    return `No se ha encontrado ese producto con id ${pid}`;
  }

  await prodModel.deleteOne({ _id: pid })
  return `Producto ${pid} eliminado con exito`;
};

updateProduct = async (idUpdateProducts, product) => {
  //Validacion para saber si el el producto con cierto ID esta en nuestra base
  let productFound = await prodModel.findByIdAndUpdate(idUpdateProducts, product, { upsert: true, new: true, rawResult: true });
  console.log(productFound)
  if (!productFound) {
    return `El producto con id ${idUpdateProducts} no se encontro.`;
  }
  console.log(`Producto con id ${idUpdateProducts} encontrado.`);
  let updateProducts = await prodModel.updateOne({ _id: { $eq: idUpdateProducts } }, { product });
  //uso updateone para cambiar algo del id recibido en el parametro. recibo el id y retorno el producto encontrado + el cambio del id.
  return {
    ...productFound,
    ...updateProducts,
  };
};
};
