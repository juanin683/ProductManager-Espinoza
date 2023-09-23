import express from "express";
import { Router } from "express";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js";

import * as pManager from "../controllers/products.controller.js";


const ProductManagerRouter = Router();

// /api/products
ProductManagerRouter.get("/", pManager.getProdManController);

ProductManagerRouter.post("/", pManager.postProdManController);

ProductManagerRouter.get("/:pid", pManager.getProdByIdController);

ProductManagerRouter.put("/:pid", pManager.updateProdByIdController);

ProductManagerRouter.delete("/:pid", pManager.deleteProdByIdController);

export default ProductManagerRouter;
