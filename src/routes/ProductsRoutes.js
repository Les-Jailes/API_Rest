const express = require('express');
const { getProduct, getProducts, createProduct, updateProduct, deleteProduct, searchProducts } = require('../controllers/ProductsController.js')

const productRouter = express.Router();

productRouter.get('/search', searchProducts);

productRouter.get('/', getProducts);

productRouter.get('/:id', getProduct);

productRouter.post('/', createProduct);

productRouter.put('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;