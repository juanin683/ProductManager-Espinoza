import fs from "fs"

class ProductManager {
    constructor(){
        this.products = [];
        this.path = "./products.json";
        
    }

    #id = 0;

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
        
        const file = await fs.promises.readFile('./products.json', 'utf8');
        const productsInFile = JSON.parse(file)
        
        this.products = productsInFile;

        // this.products.push({
        //     id: this.#id++,
        //     ...product,
            
        // });

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
        this.products = (JSON.parse(readFile))
        
        const misProductos = this.products.find((prod) => prod.id === id)
        return !misProductos ? ("NOT FOUND") : misProductos;
    }


    
    deleteProduct = async(id)=>{
        let readFile3 = await fs.promises.readFile(this.path, "utf8")
        return (JSON.parse(readFile3))
        
        let deleteProductId = readFile3.filter(prod => prod.id === id)
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProductId))

    }
    
    updateProduct = async({id, ...productManager})=>{
        
    
        await this.deleteProductId(id);
       let productOld = await readFile
    }
}

const productManager = new ProductManager();



let product1 = { 
    " title": "Royal Canin Gastrointestinal LOW FAT DOG x 1.5kg",
    "description":"Edad: Adulto Tipo de Alimento:Seco Peso: 1.5kg",
    "price": 3680,
    "thumbnail": "https://hollywoodpetshop.com.ar/wp-content/uploads/2022/04/GASTROINTESTINAL-LOW-FAT-DOG-300x300.jpg",
    "code": "Perros1",
    "stock": 10,
    "categoria": "Perros"}
    
await productManager.addProducts(product1)

console.log(productManager.getProducts(1))

// let p = productManager.getProductById(1)
// console.log(p)

// productManager.deleteProductId(1)

//1
productManager.updateProduct({
    " title": "Royal Canin Gastrointestinal LOW FAT DOG x 1.5kg",
    "description":"Edad: Adulto Tipo de Alimento:Seco Peso: 1.5kg",
     "price": 3900,
     "thumbnail": "https://hollywoodpetshop.com.ar/wp-content/uploads/2022/04/GASTROINTESTINAL-LOW-FAT-DOG-300x300.jpg",
     "code": "Perros1",
     "stock": 10,
     "categoria": "Perros"
    
    })

    
//2    
    // {
    //    " title": "Cat Chow Adulto Peso Saludable x 3kg",
    //     "description":  "Edad: Adulto Tipo de Alimento:Seco Peso:3 kg Reducido en calorias para ayudar a controlar su peso y fortalecer sus defensas",
    //     "price": 3280,
    //     "thumbnail": "https://hollywoodpetshop.com.ar/wp-content/uploads/2019/01/Cat-chow-peso-saludable-1.png",
    //     "code": "Gatos1",
    //     "stock": 15,
    //     "categoria": "Gatos"