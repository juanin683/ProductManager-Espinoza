import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Products'
                },
                quantity: {
                    type: Number,
                    default: 1
                }

            }
        ],
        default: []
    }
});

const cartModel = mongoose.model('carts', cartsSchema);

export default cartModel;