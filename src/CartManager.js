import fs from "fs"

 export default class CartManager {
    constructor(){
        this.path = "./src/db/cart.json"
    }

    loadDataCart = async()=>{
        let cartProduct = await fs.promises.readFile(this.path,"utf8")
        return JSON.parse(cartProduct)
    }

    writeCart = async(cartProduct) =>{
        await fs.promises.writeFile(this.path, JSON.stringify(cartProduct))
    }


addCart = async(id) =>{
    let add = await this.loadDataCart()
    let prodInCart = [{id: id, products: []}, ...add]
    await this.writeCart(prodInCart)
}

getCartById = async(id)=>{
    const misProductosId = this.path.find((prod) => prod.id === id);
    return !misProductosId ? "NOT FOUND" : misProductosId;

}

addProductInCartById = async(idCart,productById)=>{
    
}

}