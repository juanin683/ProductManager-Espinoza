import mongoose from "mongoose";
import prodModel from "../models/products.schema.js";
import * as productsServices from "../services/products.services.js"
import handlebars from "express-handlebars";
import __dirname from "../config/multer.js";
import ProductManager from "../dao/mongo/ProductManager.js";

const productManager = new ProductManager();

export const getProdManController = async (req, res) => {
    
    try {
        const prods = await productsServices.getProdManServices()
        res.send(prods);
    } catch (error) {
        console.log(error)
    }
}


export const postProdManController = async (req, res) => {
    try {
      const postProds = await productsServices.postProdManServices()
      res.send(postProds);
    } catch (err) {
      console.log(err);
    }
  }

export const getProdByIdController = async (req, res) => {
    const itemById = await productsServices.getProdByIdServices();
    res.send(itemById);
  }

export const updateProdByIdController = async (req, res) => {
  const upById = await productsServices.updateProdByIdServices();
  res.send(upById);
}

export const deleteProdByIdController = async (req, res) => {
    const deleteProductById = await productsServices.deleteProdByIdServices();
    res.send(deleteProductById);
  }