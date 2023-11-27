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
            console.error(`Product not found in the database with code: ${purchasedProduct.code}`);
            continue; 
        }

        const sizeToUpdate = productInDB.sizes.find(size => size.size === purchasedProduct.size);

        if (sizeToUpdate) {
            sizeToUpdate.quantity = Math.max(0, sizeToUpdate.quantity - purchasedProduct.quantity); 
            await productInDB.save();
        } else {
            console.error(`Size not found for the product with code: ${purchasedProduct.code}`);
        }
    }
});

const searchProducts = asyncHandler(async (req, res) => {
    try {
        const searchTerms = req.query.q.split(/\s+/);

        const searchQuery = searchTerms.map(term => ({
            $or: [
                { name: { $regex: term, $options: 'i' } },
                { category: { $regex: term, $options: 'i' } },
                { type: { $regex: term, $options: 'i' } },
                { description: { $regex: term, $options: 'i' } },
                { code: { $regex: term, $options: 'i' } },
                { "color": { $regex: term, $options: 'i' } }, 
            ]
        }));

        const products = await Product.find({ $and: searchQuery });

        if (products.length === 0) {
            return res.status(200).json({ message: "No products were found matching your search query!" });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductQuantities,
    searchProducts,
};