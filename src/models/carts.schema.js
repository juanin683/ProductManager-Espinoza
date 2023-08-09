import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
   "products":[{}]
});

const cartModel = mongoose.model('carts', cartsSchema);

export default cartModel;