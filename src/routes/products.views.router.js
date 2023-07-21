import express from "express";
import { Router } from "express";
import { Server as SocketServer} from "socket.io";
import ProductManager from "../ProductManager.js";
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js"


const appPm = express();
const productManager = new ProductManager();
const ProductViewsRouter = Router();
// const socketEnRouter = new SocketServer(appPm)

appPm.engine("handlebars", handlebars.engine());
appPm.set('views',`/src/views`);
appPm.set("view engine", 'handlebars');

ProductViewsRouter.get("/", async (req, res) => {
        // let limit = parseInt(req.query.limit);
        // if (!limit) return res.send
    const prodList = await productManager.getProducts();
        // let productLimit = (await productManager.getProducts()).slice(0, limit);
        // res.send(productLimit);

    res.render("index", {prodAll: prodList})
});

// //inicio websocket
// socketEnRouter.on("/realtimeproducts", async (socket) => {
//     const productList = await productManager.getProducts({});
//     socket.emit("sendAllProducts",productList)
//     console.log("socket connection")
// });

// socketEnRouter.on("addProducts",async(p,res)=>{
//     await productManager.addProducts(p);
//     const updProducts = await productManager.getProducts({})
//     socket.emit("sendAllProducts",updProducts)
//     console.log("socket connection")
//     res.redirect("/realtimeproductslist")


// })

// socketEnRouter.on("deleteProduct", async (id,res) => {
//     await productManager.deleteProduct(id);
//     const updProducts = await productManager.getProducts({});
//     socketio.emit("sendAllProducts", updProducts);
//     res.redirect("/realtimeproductslist")

//   });
// //fin websocket


ProductViewsRouter.get("/:pid", async (req, res) => {
    let id = parseInt(req.params.pid);
    let productId = await productManager.getProductById(id);
    res.send(productId);
});

ProductViewsRouter.post('/',async(req,res) => {
        const body = req.body;

        let addProducts = await productManager.addProducts(body)
        res.send(addProducts)

})

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

