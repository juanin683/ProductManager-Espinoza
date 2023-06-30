import fs from "fs"

class ProductManager {
    constructor(){
        this.products = [];
        this.path = "./products.json";
        this.loadData();
    }

    #id = 0;
     loadData = async() =>{
        try {
        const file = await fs.promises.readFile('./products.json', 'utf8');
        const productsInFile = JSON.parse(file)
        
        this.products = products;
        this.#id = productsInFile [productsInFile.length - 1].id +1 
        
        } catch (err) {
            console.log(`El archivo${this.path} no existe, creando...`)
            await fs.promises.writeFile(this.path, "[]")
            return [];
        }
     }
    addProducts = async(product) => {
        try {
            
            const { 
            title,
            description, 
            price, 
            thumbnail, 
            code, 
            stock, 
            categoria,
            } = product;
        
         const codeExist1 = this.products.some((product) => product.code === code);
         if (codeExist1) {
             console.log("Este codigo ya existe:", code);
            
            return;
         }
        
        

          this.products.push({
             id: this.#id++,
              ...product,
      
          });

        if (this.products.length === 0) {
            this.#id = 1;
        }


        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
        return product;

    } catch (error) {
        console.log(error)
    }

    };



    getProducts = async () =>{
        let readFile = await fs.promises.readFile(this.path, "utf8")
        return (JSON.parse(readFile))
    }

    getProductById = async(id) => {
        
        let readFile = await fs.promises.readFile(this.path, "utf8")
        this.products = JSON.parse(readFile)
        
        const misProductos = this.products.find((prod) => prod.id === id)
        return !misProductos ? ("NOT FOUND") : misProductos;
    }


    
    deleteProduct = async(id)=>{
        let readFile = await fs.promises.readFile(this.path, "utf8")
        this.products =  JSON.parse(readFile)
        
        let deleteProductId = this.products.find((product) => product.id === id)
        
        if (!deleteProductId) {
            return `No se ha encontrado ese producto con id ${id}`;
        } 

        let deleteProd = this.products.filter((p) => p.id !== id)
        
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProd,null,2))

    }

    updateProduct = async(id, product)=>{
        
        let readFile = await fs.promises.readFile(this.path, "utf8")
        this.products= JSON.parse(readFile)

       let productOld = this.products.find((product) => product.id === id)
        
       if (!productOld) {
        return `No se ha encontrado ese producto con id ${id}`;
        } 

    let update = this.products.map((p) => {
        if (p.id ===id) {
            return {...p, ...product};
        }
        return p;
    })
    await fs.promises.writeFile(this.path, JSON.stringify(update,null,2))
    
    }

}

const productManager = new ProductManager();


let product1 = { 
    "title": "Royal Canin Gastrointestinal LOW FAT DOG x 1.5kg",
    "description":"Edad: Adulto Tipo de Alimento:Seco Peso: 1.5kg",
    "price": 3680,
    "thumbnail": "https://hollywoodpetshop.com.ar/wp-content/uploads/2022/04/GASTROINTESTINAL-LOW-FAT-DOG-300x300.jpg",
    "code": "Perros1",
    "stock": 10,
    "categoria": "Perros"}
    

let product2 = {
    "title": "Cat Chow Adulto Peso Saludable x 3kg",
    "description":  "Edad: Adulto Tipo de Alimento:Seco Peso:3 kg Reducido en calorias para ayudar a controlar su peso y fortalecer sus defensas",
    "price": 3280,
    "thumbnail": "https://hollywoodpetshop.com.ar/wp-content/uploads/2019/01/Cat-chow-peso-saludable-1.png",
    "code": "Gatos1",
    "stock": 15,
    "categoria": "Gatos"}


await productManager.addProducts(product1)
await productManager.addProducts(product2)



// let p = productManager.getProductById(1)
// console.log(p)
let p1 = await productManager.getProductById(0)
console.log(p1)

let p2 = await productManager.getProductById(1)
console.log(p2)

let p1Update = await productManager.updateProduct({
   " title": "Royal Canin Gastrointestinal LOW FAT DOG x 1.5kg",
   "description":"Edad: Adulto Tipo de Alimento:Seco Peso: 1.5kg",
   "price": 3900,
   "thumbnail": "https://hollywoodpetshop.com.ar/wp-content/uploads/2022/04/GASTROINTESTINAL-LOW-FAT-DOG-300x300.jpg",
   "code": "Perros1",
   "stock": 20,
   "categoria": "Perros"
   })
console.log(p1Update)

// let deleteo = productManager.deleteProduct(1)
// console.log(deleteo)

 console.log(productManager.getProducts(1))