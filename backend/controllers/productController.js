const products = require("../models/productModel");

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

exports.createProduct = (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
  const Product = require('../models/Product');

// GET ALL
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET BY ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price
        });

        const saved = await newProduct.save();
        res.status(201).json(saved);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
};