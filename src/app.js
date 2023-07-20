import express from "express";
import handlebars from "express-handlebars";
import { Server as SocketServer } from "socket.io";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import ProductManagerRouter from "./routes/ProductManager.router.js";
import ProductViewsRouter from "./routes/products.views.router.js";
import Cart from "./routes/Cart.router.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();


//websockets
const appServer = app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080...")
});

const socketio = new SocketServer(appServer)

app.engine("handlebars", handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set("view engine", 'handlebars')



app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/assets",express.static("assets"));
app.use(express.static(`${__dirname}/public`));

app.use("/api/products",ProductManagerRouter);
app.use("/productsList",ProductViewsRouter);
app.use("/api/carts",Cart);




app.get("/realtimeproducts",(req,res)=>{
res.render("realTimeProducts")
})


const prodmanager = new ProductManager(`${__dirname}/src/db/products.json`)
//products con websockets
socketio.on("/realtimeproducts", async (req, res) => {


});

socketio.on("connection",async(socket)=>{
    const productList = await prodmanager.getProducts({});
    socket.emit("sendAllProducts",productList)
    console.log("socket connection")

})


socketio.on("addProducts",async(p)=>{
    await prodmanager.addProducts(p);
    const updProducts = await prodmanager.getProducts({})
    socket.emit("sendAllProducts",updProducts)
    console.log("socket connection")

})

socketio.on("deleteProduct", async (id) => {
    await prodmanager.deleteProduct(id);
    const updProducts = await prodmanager.getProducts({});
    socketio.emit("sendAllProducts", updProducts);
  });




