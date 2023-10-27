import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
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
    owner: {
        type:[{
            email: {
                type:String,
                ref:"user"
            }
            
      
        }]
    },
})
productsSchema.plugin(mongoosePaginate)
const prodModel = mongoose.model("products", productsSchema);

export default prodModel;