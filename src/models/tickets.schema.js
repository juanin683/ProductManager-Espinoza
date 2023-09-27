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
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {type: Number},
    //contendra el correo del usuario ligado al carrito
    purchaser: {
        type: String,
        required: true
    }
});
const ticketsModel = mongoose.model("tickets", ticketsSchema);
export default ticketsModel;