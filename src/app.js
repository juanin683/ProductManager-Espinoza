import express from "express";
import ProductManager from "./ProductManager.js";
import CartManager from "./CartManager.js"
import ProductManagerRouter from "./routes/ProductManager.router.js";
import Cart from "./routes/Cart.router.js"


const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/assets",express.static("assets"))
app.use("/api/products",ProductManagerRouter)
app.use("/api/carts",Cart)



app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080...");
});