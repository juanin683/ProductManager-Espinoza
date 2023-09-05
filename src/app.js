import mongoose from "mongoose";
import express from "express";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import passport from "passport";

import ProductManagerRouter from "./routes/ProductManager.router.js";
import ProductViewsRouter from "./routes/products.views.router.js";
import loginViewsRouter from "./routes/login.views.router.js";
import sessionRouter from "./routes/sessions.js"
import Cart from "./routes/Cart.router.js";
import localStrategy from "./config/passport.config.js";
import authRouter from "./routes/auth.router.js";
import router from "./routes/userManager.router.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import userRouter from "./routes/userManager.router.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// const httpServer = HTTPServer(app);
// const socketio = new SocketIO(httpServer);

//middleware socket
// app.use((req, res, next) => {
  //   req.io = socketio;
  //   next();
  // });
//
app.use(cookieParser())
//mongoose  
mongoose.connect(`mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/db`)

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//contenido estatico
app.use("/assets", express.static("assets"));
app.use(express.static(`${__dirname}/public`));


//mongo session
app.use(
  session({
    secret:"fenjwoigfr",
    resave:"true",
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/',
      ttl:2300,
      dbName:"users",
    }),
    
  })
)

//rutas
app.use("/api/products", ProductManagerRouter)
app.use("/api/carts", Cart);
// app.use("/api/auth", authRouter);
app.use("/api/usersrouter",userRouter)
// app.use("/api/sessions",sessionRouter)
app.use("/api",router)

app.use("/", loginViewsRouter);
app.use("/products", ProductViewsRouter);


//passport init 
localStrategy();
app.use(passport.initialize())
app.use(passport.session())


app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080...");
});


// inicio socket
// //render en /products
// app.get("/products", (req, res) => {
//   res.render("allproducts");
//   req.io.emit("sendMessage");
// });

// //products


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



// const socketEnRouter = new SocketServer(appPm)

// fin socket

