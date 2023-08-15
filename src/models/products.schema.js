import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = "products";
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    price: {
        type: Number,
    },
    code: {
        type: String,
    },
    stock: {
        type: Number,
    },
    categoria: {
        type: String,
    },
})
productsSchema.plugin(mongoosePaginate)
const prodModel = mongoose.model("products", productsSchema);

export default prodModel;