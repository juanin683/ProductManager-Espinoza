import mongoose from "mongoose";
import prodModel from "../../models/products.schema.js";
import handlebars from "express-handlebars";
import __dirname from "../../config/multer.js"
import ProductManager from "../mongo/ProductManager.js";

const productManager = new ProductManager();

export const getProdManDao = async (req, res) => {
    
        const allProducts = await productManager.getProducts();
        const {page=1, limit=10,sort=-1, query = ""} = req.query;

        let docs = await prodModel.paginate(
           { title:{$regex :query,$options :"i"}},
           {limit,page,sort:{ title :sort}}
            )
        console.log(docs)

        res.send({ allProducts });
  
}


export const postProdManDao = async (req, res) => {
    try {
      const body = req.body;
  
      let addProducts = await productManager.addProducts(body);
      res.send({ addProducts });
    } catch (err) {
      console.log(err);
    }
  }

  export const getProdByIdDao = async (req, res) => {
    let id = req.params.pid;
    let productId = await productManager.getProductById(id);
    res.send({ productId });
}


export const updateProdByIdDao = async (req, res) => {
    let { pid } = req.params;
    let updateProductBody = req.body;
    res.send(await productManager.updateProduct(pid, updateProductBody));
}

export const deleteProdByIdDao = async (req, res) => {
    let deleteById = req.params.pid;
    let deleteProduct = await productManager.deleteProduct(deleteById);
    res.send(deleteProduct);
  }