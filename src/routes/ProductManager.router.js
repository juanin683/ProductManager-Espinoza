import { Router } from "express";
import ProductManager from "../ProductManager.js";


const productManager = new ProductManager();
const ProductManagerRouter = Router()

ProductManagerRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await productManager.getProducts());
    let productLimit = (await productManager.getProducts()).slice(0, limit);
    res.send(productLimit);
});

ProductManagerRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    let productId = await productManager.getProductById(id);
    res.send(productId);
});

ProductManagerRouter.post('/',async(req,res) => {
        const body = req.body;

        let addProducts = await productManager.addProducts(body)
        res.send(addProducts)

})

ProductManagerRouter.put('/:pid',async(req,res) => {
    let UpId = parseInt(req.params.pid);
    let updateProductBody = req.body;
    res.send(await productManager.updateProduct(UpId,updateProductBody))
})

ProductManagerRouter.delete('/:pid',async(req,res) => {
    let deleteById = parseInt(req.params.pid)
    let deleteProduct = await productManager.deleteProduct(deleteById)
    res.send(deleteProduct)

})

export default ProductManagerRouter

