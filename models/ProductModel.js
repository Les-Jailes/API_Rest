const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {
        code:{
            type: String,
            require: true,
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        color: [
            {
                type: String,
                required: true,
            }
        ],
        size: [
            {
                type: String,
                required: true,
            }
        ],
        path: [
            {
                type: String,
                required: true,
            }
        ],
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;