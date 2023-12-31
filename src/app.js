import mongoose from "mongoose";
import express from "express";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Server as SocketServer } from "socket.io";
import { Server as HTTPServer } from "http";
import passport from "passport";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
// import "dotenv/config.js";
import config from "./config/swagger.js";

import ProductManager from "./dao/mongo/ProductManager.js";
import ProductRealTimeRouter from "./routes/prodsRealTime.js";
import prodModel from "./models/products.schema.js";
import ProductManagerRouter from "./routes/ProductManager.router.js";
import ProductViewsRouter from "./routes/products.views.router.js";
import loginViewsRouter from "./routes/login.views.router.js";
import Cart from "./routes/Cart.router.js";
import localStrategy from "./config/passport.config.js";
import router from "./routes/userManager.router.js";
import msgRouter from "./routes/msg.router.js";
import routerMock from "./routes/mockingProds.js";
import errorManager from "./utils/error.middleware.js";
// import winston from "./utils/winston.js";

import env from "./env.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import welcomeViewsRouter from "./routes/msjWelcome.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = HTTPServer(app);
const io = new SocketServer(httpServer);

const specs = swaggerJSDoc(config);
//mongoose
mongoose.connect(
  `mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/db`
);

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(winston);


//contenido estatico
app.use("/assets", express.static("assets"));
app.use(express.static(`${__dirname}/public`));

//mongo session
app.use(
  session({
    secret: "alqamar123",
    resave: "true",
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://juanaespinoza543:Qz7UOssv2uDoIkFo@cluster0.eakk9vx.mongodb.net/db",
      ttl: 2300,
      dbName: "users",
    }),
  })
);

//rutas
app.use("/api/products", ProductManagerRouter);
app.use("/api/carts", Cart);
app.use("/api/auth", router);
// app.use("/api/sessions",sessionRouter)
// app.use("/api", router);

app.use("/", welcomeViewsRouter);
app.use("/home", loginViewsRouter);
app.use("/products", ProductViewsRouter);
app.use("/productsrealtime", ProductRealTimeRouter);

app.use("/chat", msgRouter);
app.use("/mockingproducts", routerMock);
app.use("/api/docs", serve, setup(specs));
app.use("/loggerTest", (req, res) => {
  let response = "response" + request;
  return res.status(200).json({
    message: "logger HTTP",
    response: true,
  });
});

io.on("connection", async (socket) => {
  socket.emit("products", await ProductManager.getProducts());

  socket.on("new_prod", async (data) => {
    await ProductManager.addProducts(data);
    socket.emit("products", await ProductManager.getProducts());
  });
  socket.on("delete_prod", async (data) => {
    await ProductManager.deleteProductbyId(data.pid);
    socket.emit("products", await ProductManager.getProducts());
    console.log(data.pid);
    const prod = await prodModel.findById(data.pid);
    const userInfo = {
      email: data.userEmail,
      role: data.userRole,
    };
    console.log(prod.owner, userInfo.email, userInfo.role);
    if (prod.owner == userInfo.email || userInfo.role == "admin") {
      await ProductManager.deleteProductbyId(data.pid);
      socket.emit("products", await ProductManager.getProducts());
    } else {
      return console.error({ error: "No puedes eliminar este producto" });
    }
  });
});

//passport init
localStrategy();
app.use(passport.initialize());
app.use(passport.session());
app.use(errorManager);

app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080...");
});
