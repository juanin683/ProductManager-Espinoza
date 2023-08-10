import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    price:{
        type:Number,
    },
    code:{
        type:String,
    },
    stock:{
        type:Number,
    },
    categoria:{
        type:String,
    },
})

const prodModel = mongoose.model('products', productsSchema);

export default prodModel;