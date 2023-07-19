import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./config/multer.js"
import { Server as SocketServer } from "socket.io";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js";
import ProductManagerRouter from "./routes/ProductManager.router.js";
import ProductViewsRouter from "./routes/products.views.router.js";
import Cart from "./routes/Cart.router.js";



const app = express();


//websockets
const appServer = app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080...")
});

const socketio = new SocketServer(appServer)

app.engine("handlebars", handlebars.engine())
app.set('views',`src/views`)
app.set("view engine", 'handlebars')



app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/assets",express.static("assets"));
app.use(express.static(`${__dirname}/public`));

app.use("/api/products",ProductManagerRouter);
app.use("/productsList",ProductViewsRouter);
app.use("/api/carts",Cart);




app.get("/",(req,res)=>{
res.render("realTimeProducts")
})

//products con websockets
socketio.on("/realtimeproducts", async (req, res) => {


});

socketio.on("conection",async(socket)=>{
    const productList = await ProductManager.getProducts();
    socket.emit("products",productList)
    console.log("socket connection")
})





