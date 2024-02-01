const mongoose = require('mongoose');


const PaymentLinkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    confirmationType: {
        type: String,
        required: true,
    },
    redirectUrl: {
        type: String,
    }, 
    confirmationText: {
        type: String,
    },
    paymentLink:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: 'active'
    }
})



module.exports = mongoose.model("PaymentLink", PaymentLinkSchema)

