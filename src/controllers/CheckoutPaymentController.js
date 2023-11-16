require('dotenv').config();
const CheckoutPayment = require('../models/CheckoutPaymentModel');
const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');

const SECRET_KEY_STRIPE = process.env.SECRET_KEY_STRIPE;
const stripe = new Stripe(SECRET_KEY_STRIPE);

const getReturnUrl = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return process.env.RETURN_URL_DEV;
        case 'test':
            return process.env.RETURN_URL_TEST;
        case 'production':
            return process.env.RETURN_URL_PROD;
        default:
            return process.env.RETURN_URL_DEV; 
    }
};

const createCheckoutPayment = asyncHandler(async (req, res) => {
    try {
        const { paymentMethodId, amount, billingDetails } = req.body;
        const returnUrl = getReturnUrl();

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
            return_url: returnUrl
        });

        const checkoutPayment = await CheckoutPayment.create({
            paymentMethodId,
            amount,
            billingDetails
        });

        res.status(201).json({ message: 'Successful Payment', checkoutPayment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getCheckoutPaymentByPaymentMethodId = asyncHandler(async (req, res) => {
    try {
        const { paymentMethodId } = req.params;
        const checkoutPayment = await CheckoutPayment.findOne({ paymentMethodId });

        if (!checkoutPayment) {
            res.status(404).json({ message: `Payment record not found with paymentMethodId: ${paymentMethodId}` });
            return;
        }

        res.status(200).json(checkoutPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getCheckoutPayments = asyncHandler(async (req, res) => {
    try {
        const checkoutPayments = await CheckoutPayment.find({});
        res.status(200).json(checkoutPayments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const updateCheckoutPayment = asyncHandler(async (req, res) => {
    try {
        const { paymentMethodId } = req.params;
        const checkoutPayment = await CheckoutPayment.findOneAndUpdate({ paymentMethodId }, req.body, { new: true });

        if (!checkoutPayment) {
            res.status(404).json({ message: `Payment record not found with paymentMethodId: ${paymentMethodId}` });
            return;
        }

        res.status(200).json(checkoutPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const deleteCheckoutPayment = asyncHandler(async (req, res) => {
    try {
        const { paymentMethodId } = req.params;
        const checkoutPayment = await CheckoutPayment.findOneAndDelete({ paymentMethodId });

        if (!checkoutPayment) {
            res.status(404).json({ message: `Payment record not found with paymentMethodId: ${paymentMethodId}` });
            return;
        }

        res.status(200).json({ message: 'Payment record deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = {
    createCheckoutPayment,
    getCheckoutPaymentByPaymentMethodId,
    getCheckoutPayments,
    updateCheckoutPayment,
    deleteCheckoutPayment
};