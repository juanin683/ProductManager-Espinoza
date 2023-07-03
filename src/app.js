import express from 'express';
import  ProductManager from '../src/main.js'

const app = express()


const productManager = new ProductManager();
const loadData = productManager.loadData()

app.get('/products', async (req, res)=>{
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await loadData)
    let allProducts = await loadData;
    let productLimit = allProducts.slice(0,limit)
    res.send (await loadData)

})

app.listen(8080, () => {
    console.log('escuchando...')
})



app.get('/products/:pid', async(req, res)=>{
    let id = parseInt(req.params.id);
    let allProducts = await loadData;
    let productId = allProducts.find(product => product.id === id)
    res.send(productId)
})