import express from "express";
import { Router } from "express";
import mongoose from "mongoose";

import ProductManager from "../dao(schemas)/ProductManager.js";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js"
import prodModel from "../models(schemas)/products.schema.js";


const productManager = new ProductManager();
const appPm = express()
const ProductManagerRouter = Router()


mongoose.connect(`mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/products?retryWrites=true&w=majority`);

appPm.engine("handlebars", handlebars.engine())
appPm.set('views',`/src/views`)
appPm.set("view engine", 'handlebars')




ProductManagerRouter.get("/", async (req, res) => {
    // let limit = parseInt(req.query.limit);
    // if (!limit) return res.send(await productManager.getProducts());
    // let productLimit = (await productManager.getProducts()).slice(0, limit);
    // res.send(productLimit);
    const allProducts = await prodModel.find();
    res.send({allProducts}) ;
});

ProductManagerRouter.post('/',async(req,res) => {
        const body = req.body;

        let addProducts = await productManager.addProducts(body)
        res.send({addProducts})

})

ProductManagerRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    let productId = await prodModel.findById(id);
    res.send({productId});
});

ProductManagerRouter.put('/:pid',async(req,res) => {
    let UpId = parseInt(req.params.pid);
    let updateProductBody = req.body;
    res.send(await prodModel.findByIdAndUpdate(UpId,updateProductBody))
})

ProductManagerRouter.delete('/:pid',async(req,res) => {
    let deleteById = parseInt(req.params.pid)
    let deleteProduct = await prodModel.findByIdAndDelete(deleteById)
    res.send(deleteProduct)

})

export default ProductManagerRouter;

