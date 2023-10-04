import { Router } from "express";
import { generateProductFaker } from '../utils/faker.js';

const routerMock = Router()

const products = []

routerMock.get('/', async (req, res) => {
    for (let i = 0; i < 100; i++){
        products.push(generateProductFaker())
    }
    res.send(products)
})

export default routerMock;