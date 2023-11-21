const Product = require("../models/ProductModel.js");
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler( async(req, res) =>{
        try {
            const products = await Product.find({});
            res.status(200).json(products)
        } catch (error) {
            res.status(error.status)
            throw new Error(error.message);

        }
    })

const getProduct =  asyncHandler( async (req, res) =>{
        try {
            const {id} = req.params;
            const product = await Product.findById(id);
            if (!product){
                res.status(error.status)
                throw new Error(`Can not find product with ID: ${id}`);
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(error.status)
            throw new Error(error.message);
        }
    })


const createProduct = asyncHandler( async (req, res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message);
    }
})

const updateProduct =  asyncHandler( async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product){
            res.status(error.status)
            throw new Error(`Can not find product with ID: ${id}`);
        }
        res.status(200).json(await Product.findById(id))
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message);
    }
})

const deleteProduct =  asyncHandler( async (req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product){
            res.status(error.status)
            throw new Error(`Can not find product with ID: ${id}`);
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message);
    }
})

const updateProductQuantities = asyncHandler(async (purchasedProducts) => {
    for (const purchasedProduct of purchasedProducts) {
        const productInDB = await Product.findOne({ code: purchasedProduct.code });

        if (!productInDB) {
            console.error(`Producto no encontrado en la base de datos con código: ${purchasedProduct.code}`);
            continue; 
        }

        const sizeToUpdate = productInDB.sizes.find(size => size.size === purchasedProduct.size);

        if (sizeToUpdate) {
            sizeToUpdate.quantity = Math.max(0, sizeToUpdate.quantity - purchasedProduct.quantity); // Restar cantidad, pero no permitir valores negativos
            await productInDB.save();
        } else {
            console.error(`Tamaño no encontrado para el producto con código: ${purchasedProduct.code}`);
        }
    }
});


module.exports = {
    getProduct, getProducts, createProduct, updateProduct, deleteProduct, updateProductQuantities
}