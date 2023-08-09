import express from "express";
import { Router } from "express";
import mongoose from "mongoose";
import ProductManager from "../dao/ProductManager.js";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js"

const productManager = new ProductManager();
const appPm = express()
const ProductManagerRouter = Router()

appPm.engine("handlebars", handlebars.engine())
appPm.set('views', `/src/views`)
appPm.set("view engine", 'handlebars')

ProductManagerRouter.get("/", async (req, res) => {
    try {
        const allProducts = await productManager.getProducts();
        res.send({ allProducts });
    } catch (error) {
        console.log(error)
    }
});

ProductManagerRouter.post('/', async (req, res) => {
    try {
        const body = req.body;

        let addProducts = await productManager.addProducts(body)
        res.send({ addProducts })
    } catch (err) {
        console.log(err)
    }
});

ProductManagerRouter.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    let productId = await productManager.getProductById(id);
    res.send({ productId });
});

ProductManagerRouter.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    let updateProductBody = req.body;
    res.send(await productManager.updateProduct(pid, updateProductBody));
});

ProductManagerRouter.delete('/:pid', async (req, res) => {
    let deleteById = req.params.pid;
    let deleteProduct = await productManager.deleteProduct(deleteById);
    res.send(deleteProduct);
});

export default ProductManagerRouter;