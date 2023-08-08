import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import ProductManager from "../dao/ProductManager.js";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js"
import prodModel from "../models/products.schema.js";


const productManager = new ProductManager();
const appPm = express()
const ProductManagerRouter = Router()


appPm.engine("handlebars", handlebars.engine())
appPm.set('views',`/src/views`)
appPm.set("view engine", 'handlebars')

ProductManagerRouter.get("/", async (req, res) => {

    try {
        const allProducts = await productManager.getProducts();
    res.send({allProducts}) ;
    } catch (error) {
        console.log(error)
    } 
});

ProductManagerRouter.post('/',async(req,res) => {
    try {
    const body = req.body;

    let addProducts = await productManager.addProducts(body)
    res.send({addProducts})
    } catch (err) {
        console.log(err)
    }
})

ProductManagerRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    let productId = await productManager.getProductById((productId) =>productId.id ===id);
    res.send({productId});
});

ProductManagerRouter.put('/:pid',async(req,res) => {
    let UpId = parseInt(req.params.pid);
    let updateProductBody = req.body;
    res.send(await productManager.updateProduct(UpId,updateProductBody));
})

ProductManagerRouter.delete('/:pid',async(req,res) => {
    let deleteById = parseInt(req.params.pid);
    let deleteProduct = await productManager.deleteProduct(deleteById);

})

export default ProductManagerRouter;