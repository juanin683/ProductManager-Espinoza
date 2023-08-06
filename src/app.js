import express from "express";
import handlebars from "express-handlebars";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";

import ProductManager from "./dao(schemas)/ProductManager.js"
import CartManager from "./dao(schemas)/CartManager.js";
import ProductManagerRouter from "./routes/ProductManager.router.js";
import ProductViewsRouter from "./routes/products.views.router.js";
import Cart from "./routes/Cart.router.js";

import mongoose from "mongoose";
import prodModel from "./models(schemas)/products.schema.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const conn = mongoose.connect(`mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/products`)
conn.then(()=>console.log("conectado!"))
const httpServer = HTTPServer(app);
const socketio = new SocketIO(httpServer);

//middleware socket
app.use((req, res, next) => {
  req.io = socketio;
  next();
});

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//contenido estatico
app.use("/assets", express.static("assets"));
app.use(express.static(`${__dirname}/public`));

//rutas
// app.use("/api/products", ProductManagerRouter);
app.use("/productsList", ProductViewsRouter);
app.use("/api/carts", Cart);
//socket
// //render en /realtimeproducts
// app.get("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts");
//   req.io.emit("sendAllProducts");
// });

// //products
// const prodmanager = new ProductManager(`${__dirname}/src/db/products.json`);

// socketio.on("connection", async (socket) => {
//   const productList = await prodmanager.getProducts();
//   socket.emit("sendAllProducts", productList);

//   socket.on("addProducts", async (product) => {
//     await prodmanager.addProducts(product);
//     console.log(product);
//     const updProducts = await prodmanager.getProducts();
//     socket.emit("sendAllProducts", updProducts);
//   });

//   socket.on("deleteProduct", async (pid) => {
//     await prodmanager.deleteProduct(pid);
//     console.log(pid);
//     const updProducts = await prodmanager.getProducts();
//     socket.emit("sendAllProducts", updProducts);
//   });
// });

// app.post("/realtimeproducts", (req, res) => {
//   res.render("realTimeProducts");
//   req.io.emit("sendAllProducts");
// });


app.use("/api/products", ProductManagerRouter)

// const socketEnRouter = new SocketServer(appPm)

app.get("/", async (req, res) => {
  // let limit = parseInt(req.query.limit);
  // if (!limit) return res.send
// const prodList = await productManager.getProducts();

// let productLimit = (await productManager.getProducts()).slice(0, limit);
  // res.send(productLimit);
const prodList = await prodModel.find()
// res.render("index", {prodAll: prodList})
res.render({prodList})
});

app.post('/',async(req,res) => {
  const body = req.body;

  const items = await prodModel.insertMany([body])
  
  // let addProducts = await productManager.addProducts(body)
  res.send(items)
});

app.get("/:pid", async (req, res) => {
let id = parseInt(req.params.pid);
let productId = await prodModel.findById({id});
res.send(productId);
});


app.put('/:pid',async(req,res) => {
let UpId = parseInt(req.params.pid);
let updateProductBody = req.body;
await prodModel.findOneAndUpdate(UpId,updateProductBody)
});

app.delete('/:pid',async(req,res) => {
let deleteById = parseInt(req.params.pid)
let deleteProduct = await prodModel.findByIdAndDelete(deleteById)
res.send(deleteProduct);

});

httpServer.listen(8080, () => {
  console.log("Escuchando en el puerto 8080...");
});

