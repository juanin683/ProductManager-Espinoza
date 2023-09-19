import mongoose from "mongoose";
import prodModel from "../models/products.schema.js";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js";
import ProductManager from "../dao/mongo/ProductManager.js";

const productManager = new ProductManager();

export const getProdManRouter = async (req, res) => {
    
    try {
        const allProducts = await productManager.getProducts();
        const {page=1, limit=10,sort=-1, query = ""} = req.query;

        let docs = await prodModel.paginate(
           { title:{$regex :query,$options :"i"}},
           {limit,page,sort:{ title :sort}}
            )
        console.log(docs)

        res.send({ allProducts });
    } catch (error) {
        console.log(error)
    }
}


export const postProdManRouter = async (req, res) => {
    try {
      const body = req.body;
  
      let addProducts = await productManager.addProducts(body);
      res.send({ addProducts });
    } catch (err) {
      console.log(err);
    }
  }

export const getProdById = async (req, res) => {
    let id = req.params.pid;
    let productId = await productManager.getProductById(id);
    res.send({ productId });
  }

export const updateProdById = async (req, res) => {
    let { pid } = req.params;
    let updateProductBody = req.body;
    res.send(await productManager.updateProduct(pid, updateProductBody));
}

export const deleteProdById = async (req, res) => {
    let deleteById = req.params.pid;
    let deleteProduct = await productManager.deleteProduct(deleteById);
    res.send(deleteProduct);
  }