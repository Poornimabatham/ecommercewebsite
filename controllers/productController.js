const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, weight, price, quantity, expiry, category } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    const product = await Product.create({
      title,
      weight,
      price,
      quantity,
      expiry,
      category,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProduct, getProducts, getProductsByCategory };
