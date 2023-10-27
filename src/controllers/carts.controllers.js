
import __dirname from "../config/multer.js"

import * as cartServices from "../services/cart.services.js"
// const shopingCart = new CartManager;
// const pm = new ProductManager()

export const getCartsController = async (req, res) => {
    try {
        const readCarts = await cartServices.getAllCartsServices()
        res.send(readCarts)
        
    } catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }
}

export const postCartsController =  async (req, res) => {
    try {
        const writeCart = await cartServices.postCartsServices();
        res.send(writeCart)
        
    } catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }


}

export const cartByIdController = async (req, res) => {
    try {
        const result = await cartServices.cartByIdServices()
        res.send(result)
        
    } catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }

}

export const deleteProdsInCartController = async (req, res) => {
    try {
        const delProdsInCart = await cartServices.deleteProdsByIdServices()
        res.send(delProdsInCart)
        
    } catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }
}

export const updateOneProdInCartController =  async (req, res) => {
    try {
        const updateProdInCart = await cartServices.updateOneProdInCartServices();
        res.send(updateProdInCart)
        
    } catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }
    

}

export const deleteOneProdInCartController = async (req, res) => {
    try {
        const deleteProdCart = await cartServices.deleteOneProdInCartServices();
        res.send(deleteProdCart)
        
    } catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }

}

export const updateCart = async (req, res) => {
    try {
        let updateCartSelected = await cartServices.updateCartServices();
        res.send(updateCartSelected)
        
    } catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }
}


export const verifyCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
    
    const cart = await cartServices.getAllCartsServices(cartId)  
   

    let totalAmount = 0; 
    const purchasedProds = [];
     
    const prodsCanBuy = cart.products.filter(item => {
    const product = item.product;
    if (product.stock >= item.quantity) {
          product.stock -= item.quantity; 
          totalAmount += product.price * item.quantity; 
          purchasedProds.push(item); 
          return false; 
        }  
        return true; 
    });  
    if (purchasedProds.length === 0) {
        res.status(400).json({ error: 'No se pudo procesar ninguna compra' });
        return;
    }  
    await Promise.all(purchasedProds.map(async item => {
        const product = await ProductModel.findById(item.product._id);
        product.stock -= item.quantity;
        await product.save();
      }));

      //ticket
      const ticketData = {
            amount: totalAmount,
            purchaser: req.session.user.email,
    };

    const newTicket = await Ticket.create(ticketData);

    if (newTicket) {
        const cartNuevo = await CartModel.findById(cartId)
        cartNuevo.products = prodsCanBuy;
        await cartNuevo.save()
    }

    res.status(200).json({
        purchasedProds,
        prodsCanBuy,
        ticket: newTicket
        });
        }
    catch (error) {
        console.log('Error al finalizar la compra:', error.message);
        res.status(500).json({
            error: 'Error server'
        });
    }
}

