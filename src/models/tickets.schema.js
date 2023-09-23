import mongoose from "mongoose";
import { Date } from "mongoose";

const ticketsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
    },
    code: {
        type: [
            {
                _id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'code'
                },
                quantity: {
                    type: Number,
                    default: 5386,
                }

            }
        ],
        default: []
    },
    purchase_datetime:{
        dia: {new Date.toLocaleDateString()}
    },
    amount: {type: Number},
    //contendra el correo del usuario ligado al carrito
    purchaser: {type: String}, 
    {timestamps:true}

});
const ticketsModel = mongoose.model("tickets", ticketsSchema);
export default ticketsModel;