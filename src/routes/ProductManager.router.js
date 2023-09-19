import express from "express";
import { Router } from "express";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js";

import * as pManager from "../controllers/products.controller.js";


const appPm = express();
const ProductManagerRouter = Router();

// /api/products
ProductManagerRouter.get("/", pManager.getProdManRouter);

ProductManagerRouter.post("/", pManager.postProdManRouter);

ProductManagerRouter.get("/:pid", pManager.getProdById);

ProductManagerRouter.put("/:pid", pManager.updateProdById);

ProductManagerRouter.delete("/:pid", pManager.deleteProdById);

export default ProductManagerRouter;
