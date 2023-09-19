import CartManager from "../dao/mongo/CartManager.js"
import ProductManager from "../dao/mongo/ProductManager.js";


const shopingCart = new CartManager;
const pm = new ProductManager()

export const getAllCarts = async (req, res) => {
    let readCart = parseInt(req.query.readCart);
    let all = await shopingCart.loadDataCart(readCart)
    res.send(all)
}

export const postCarts =  async (req, res) => {
    
        const body = req.body;

        let postCart = await shopingCart.addCart(body)
        res.send({ postCart })
 
}


export const cartById = async (req, res) => {
   
        let cid = req.params.cid;
        let idCart = await shopingCart.getCartById(cid)

        res.send({ idCart });
  
}

export const deleteProdsById = async (req, res) => {
    let delCartCid = req.params.cid;
    const cart = await shopingCart.getCartById(delCartCid);
    cart.products = [];
    if (!cart) {
        return res.status(404).send({ message: `Cart with ID: ${delCartCid} not found` });
    }

    await shopingCart.deleteAllProdsInCart(delCartCid, cart.products);

    return res.status(200).send({
        status: 'success',
        message: `The cart with ID: ${delCartCid} was emptied correctly`,
        cart: cart,
    });
}

export const updateOneProdInCart =  async (req, res) => {
    let cidCart = req.params.cid;
    let productById = req.params.pid;
    let { quantity } = req.body;
    res.send(
        await shopingCart.addProductInCartById(cidCart, { _id: productById, quantity: +quantity })
    )
}

export const deleteOneProdInCart = async(req,res) => {
    try {

        const { cid, pid } = req.params;
        console.log(cid)
        const checkCart = await shopingCart.getCartById(cid);

        console.log(checkCart)
        const findbyIndex = checkCart.products.findIndex((product) => product._id == pid);

        if (findbyIndex === -1) {
            return res.status(404).send({ status: 'error', message: `Product with ID: ${pid} not found in cart` });
        }

        // checkCart.products.splice(findbyIndex, 1);
        const updatedCart = await shopingCart.deleteProdInCart(cid, pid);

        return res.status(200).send({ status: 'success', message: `Deleted product with ID: ${pid}`, cart: updatedCart });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'An error occurred while processing the request' });
    }
}

export const updateCart = async (req, res) => {
    let upCartCid = req.params.cid;
    let listaProducts = req.body;

    console.log(listaProducts)
    res.send(await shopingCart.updateProdincart(upCartCid, listaProducts));
}