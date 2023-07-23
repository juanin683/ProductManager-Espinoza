import express from "express";
import handlebars from "express-handlebars";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";

import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import ProductManagerRouter from "./routes/ProductManager.router.js";
import ProductViewsRouter from "./routes/products.views.router.js";
import Cart from "./routes/Cart.router.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const httpServer = HTTPServer(app);

const socketio = new SocketIO(httpServer)

//middleware socket

app.use((req,res,next)=>{
    req.io = socketio;
    next();
})



//handlebars
app.engine("handlebars", handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set("view engine", 'handlebars')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//contenido estatico
app.use("/assets",express.static("assets"));
app.use(express.static(`${__dirname}/public`));

//rutas
app.use("/api/products",ProductManagerRouter);
app.use("/productsList",ProductViewsRouter);
app.use("/api/carts",Cart);

//render en /realtimeproducts
app.get("/realtimeproducts",(req,res)=>{
res.render("realTimeProducts")
req.io.emit("sendAllProducts")
})



//products 
const prodmanager = new ProductManager(`${__dirname}/src/db/products.json`)

socketio.on("connection",async(socket)=>{
    const productList = await prodmanager.getProducts({});
    socket.emit("sendAllProducts",productList)

    socket.on("addProducts",async(product)=>{
        await prodmanager.addProducts(product);
        console.log(product)
        const updProducts = await prodmanager.getProducts({})
        socket.emit("sendAllProducts",updProducts)
    })

    socket.on("deleteProduct", async (pid) => {
        await prodmanager.deleteProduct(pid);
        console.log(pid)
        const updProducts = await prodmanager.getProducts({});
        socketio.emit("sendAllProducts", updProducts);
    });
})

app.post("/realtimeproducts",(req,res)=>{
    res.render("realTimeProducts")
    req.io.emit("sendAllProducts")

    
})

httpServer.listen(8080, () => {
    console.log("Escuchando en el puerto 8080...")
});



