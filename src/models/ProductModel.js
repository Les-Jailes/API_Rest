const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = mongoose.Schema(
  {
    code: {
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
      },
    ],
    sizes: [sizeSchema],
    path: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "Product",
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
