import fs from "fs"

 export default class CartManager {
    constructor(){
        this.path = "./src/db/cart.json"
        this.cart = []
        this.loadDataCart()
    }
    #id = 0;
    
    loadDataCart = async()=>{
        let cartProduct = await fs.promises.readFile(this.path,"utf8")
        const cartInFile =  JSON.parse(cartProduct)

        this.cart = cartInFile;

        if (cartInFile.length===0) {
            this.#id = 1;
        } else {
            this.#id = cartInFile[cartInFile.length - 1].id + 1;
        }
    }

    writeCart = async(cartProduct) =>{
        await fs.promises.writeFile(this.path, JSON.stringify(cartProduct))
    }


addCart = async() =>{
    //  let add = await this.loadDataCart()
    
   
     let prodInCart = [{id: this.#id++ , products: []}]
     
     
     this.cart.push({
         ...prodInCart
     })
    await this.writeCart(prodInCart)
}

getCartById = async(id)=>{
    const misProductosId = JSON.parse(
    await fs.promises.readFile(this.path, "utf8")
    ).find((prod) => prod.id === id);
    return !misProductosId ? "NOT FOUND" : misProductosId;

}

addProductInCartById = async(cidCart,productById)=>{
    
    if (cidCart.cart.some(product => product.id === productById)) {
        let productInCart = cidCart.cart.find(p => p.id === productById)
        let quantity =1;
        productInCart.quantity++
    }




    
    let productsAll = await this.loadDataCart()
    let cartIdFilter = productsAll.filter(prod => prod.id !== productById )
    let cartContainer = [{id: cidCart, products: [{id: productById.id, quantity:1}]},...cartIdFilter]
    await this.writeCart(cartContainer)
}

}