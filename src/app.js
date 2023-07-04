import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await productManager.getProducts());
  let productLimit = (await productManager.getProducts()).slice(0, limit);
  res.send(productLimit);
});

app.get("/products/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  let productId = await productManager.getProductById(id);
  res.send(productId);
});

app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080...");
});