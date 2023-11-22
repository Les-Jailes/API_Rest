const express = require('express');
const {
    createCheckoutPayment,
    getCheckoutPaymentByPaymentMethodId,
    getCheckoutPayments,
    updateCheckoutPayment,
    deleteCheckoutPayment
} = require('../controllers/CheckoutPaymentController');

const checkoutPaymentRouter = express.Router();

checkoutPaymentRouter.get('/', getCheckoutPayments);

checkoutPaymentRouter.post('/', createCheckoutPayment);

checkoutPaymentRouter.get('/:paymentMethodId', getCheckoutPaymentByPaymentMethodId);

checkoutPaymentRouter.put('/:paymentMethodId', updateCheckoutPayment);

checkoutPaymentRouter.delete('/:paymentMethodId', deleteCheckoutPayment);

module.exports = checkoutPaymentRouter;
