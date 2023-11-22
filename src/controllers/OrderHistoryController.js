const User = require("../models/UserModel.js");
const CheckoutPayment = require('../models/CheckoutPaymentModel.js');
const asyncHandler = require('express-async-handler');

const getUserHistoryById =  asyncHandler( async (req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if (!user){
            res.status(error.status)
            throw new Error(`Can not find user with ID: ${id}`);
        }
        
        const checkoutPayment = await CheckoutPayment.findOne({ userId : id });
        if (!checkoutPayment){
            res.status(error.status)
            throw new Error(`Can not find user with checkout ID: ${id}`);
        }

        res.status(200).json(checkoutPayment);
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message);
    }
})

module.exports = {  
    getUserHistoryById,
}