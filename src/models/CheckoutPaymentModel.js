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

const purchasedProductSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false 
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    color: [{
        type: String,
        required: true
    }],
    path: [{
        type: String,
        required: true
    }],
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const checkoutPaymentSchema = mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    paymentMethodId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    billingDetails: billingDetailsSchema,
    purchasedProducts: [purchasedProductSchema]
}, {
    timestamps: true,
    collection: 'CheckoutPayments'
});

const CheckoutPayment = mongoose.model('CheckoutPayment', checkoutPaymentSchema);
module.exports = CheckoutPayment;
