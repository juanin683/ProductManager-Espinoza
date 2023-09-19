import * as productsDao from "../dao/Dao/productsManager.dao.js"
import __dirname from "../config/multer.js";
import ProductManager from "../dao/mongo/ProductManager.js";

const productManager = new ProductManager();

export const getProdManServices= async (req, res) => {
    
    try {
       const allProducts2 = await productsDao.getProdManDao();
       res.send(allProducts2)
    } catch (error) {
        console.log(error)
    }
}

export const postProdManServices = async (req, res) => {
    try {
      const body = req.body;
  
      let addProducts = await productManager.addProducts(body);
      res.send( addProducts );
    } catch (err) {
      console.log(err);
    }
  }


export const getProdByIdServices = async (req, res) => {
    try {
        const p = await productsDao.getProdByIdDao()
        res.send(p)
    } catch (error) {
        console.log(error.message)
    }
}

export const updateProdByIdServices = async (req, res) => {
    try {
        const up = await productsDao.getProdByIdDao()
        res.send(up)
        
    } catch (error) {
        console.log(error.message)
        
    }
}

export const deleteProdByIdServices = async (req, res) => {
    const delProd = await productsDao.deleteProdByIdDao();
    res.send(delProd);
  }