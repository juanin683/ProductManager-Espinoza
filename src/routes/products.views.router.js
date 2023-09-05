import express from "express";
import { Router } from "express";
import { Server as SocketServer} from "socket.io";
import ProductManager from "../dao/mongo/ProductManager.js";
import handlebars from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))

const appPm = express();
const productManager = new ProductManager();
const ProductViewsRouter = Router();
// const socketEnRouter = new SocketServer(appPm)

appPm.engine("handlebars", handlebars.engine());
appPm.set("views", `${__dirname}/src/views`);
appPm.set("view engine", "handlebars");

ProductViewsRouter.get("/", async (req, res) => {

    let all = await productManager.getProducts();

    res.render("allproducts", {allProducts: all})
});


ProductViewsRouter.post('/',async(req,res) => {
    const body = req.body;

    let addProducts = await productManager.addProducts(body)
    res.send(addProducts)

});

ProductViewsRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    let productId = await productManager.getProductById(id);
    res.send(productId);
});

ProductViewsRouter.put('/:pid',async(req,res) => {
    let UpId = parseInt(req.params.pid);
    let updateProductBody = req.body;
    res.send(await productManager.updateProduct(UpId,updateProductBody))
})

ProductViewsRouter.delete('/:pid',async(req,res) => {
    let deleteById = parseInt(req.params.pid)
    let deleteProduct = await productManager.deleteProduct(deleteById)
    res.send(deleteProduct);

})


export default ProductViewsRouter;

