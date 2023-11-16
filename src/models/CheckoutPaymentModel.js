const mongoose = require('mongoose');

const billingDetailsSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        line1: {
            type: String,
            required: true
        },
        postal_code: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
});

const checkoutPaymentSchema = mongoose.Schema({
    paymentMethodId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    billingDetails: billingDetailsSchema
}, {
    timestamps: true,
    collection: 'CheckoutPayments'
});

const CheckoutPayment = mongoose.model('CheckoutPayment', checkoutPaymentSchema);
module.exports = CheckoutPayment;
