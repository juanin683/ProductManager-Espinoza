import express from "express";
import { Router } from "express";
import ProductManager from "../dao/mongo/ProductManager.js";
import handlebars from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

const appPm = express();
const productManager = new ProductManager();
const ProductRealTimeRouter = Router();

appPm.engine("handlebars", handlebars.engine());
appPm.set("views", `${__dirname}/src/views`);
appPm.set("view engine", "handlebars");

ProductRealTimeRouter.get("/", async (req, res) => {

    let index = await productManager.getProducts();

    res.render("index", {allProducts: index})
});



export default ProductRealTimeRouter;

