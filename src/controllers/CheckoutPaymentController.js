const CheckoutPayment = require('../models/CheckoutPaymentModel');
const asyncHandler = require('express-async-handler');

const createCheckoutPayment = asyncHandler(async (req, res) => {
    try {
        const checkoutPayment = await CheckoutPayment.create(req.body);
        res.status(201).json(checkoutPayment);
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