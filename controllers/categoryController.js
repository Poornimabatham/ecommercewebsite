const Category = require('../models/Category');

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

const createCategory = async (req, res) => {
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Body:', req.body);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });

  res.status(201).json(category);
};
module.exports = { getCategories, createCategory };
