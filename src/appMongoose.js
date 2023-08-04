// import  express  from "express";
// import mongoose from "mongoose";
// import prodModel from "./models(schemas)/products.schema.js";
// import productManager from "./dao(schemas)/ProductManager.js"
// import ProductManagerRouter from "./routes/ProductManager.router.js";

// const appPm = express()

// mongoose.connect(`mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/products?retryWrites=true&w=majority`)

// appPm.use("/api/products", ProductManagerRouter)

// // const socketEnRouter = new SocketServer(appPm)


// appPm.get("/api/productswithmongoose", async (req, res) => {
//         // let limit = parseInt(req.query.limit);
//         // if (!limit) return res.send
//     // const prodList = await productManager.getProducts();

//     // let productLimit = (await productManager.getProducts()).slice(0, limit);
//         // res.send(productLimit);
//     const prodList = await prodModel.find()
//     // res.render("index", {prodAll: prodList})
//     res.render({prodList})
// });

// appPm.post('/api/productswithmongoose',async(req,res) => {
//         const body = req.body;

//         const items = await prodModel.insertMany([body])
        
//         // let addProducts = await productManager.addProducts(body)
//         res.send(items)
// })

// appPm.get("/:pid", async (req, res) => {
//     let id = parseInt(req.params.pid);
//     let productId = await prodModel.findById({id});
//     res.send(productId);
// });


// appPm.put('/:pid',async(req,res) => {
//     let UpId = parseInt(req.params.pid);
//     let updateProductBody = req.body;
//     res.send(await productManager.updateProduct(UpId,updateProductBody))
// })

// appPm.delete('/:pid',async(req,res) => {
// let deleteById = parseInt(req.params.pid)
// let deleteProduct = await productManager.deleteProduct(deleteById)
// res.send(deleteProduct);

// })

// appPm.listen(8081, () => {
//     console.log("Escuchando en el puerto 8081...");
//   });

// export default appPm;


