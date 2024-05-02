const ProductModel = require('../models/ProductModel');
 
const createProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product added successfully', id: savedProduct._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ message: 'All product fetched!!', products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const productFindById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product fetched successfully!!', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const existingProduct = await ProductModel.findById(req.params.id);
    
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Increment the version to ensure concurrency control
    req.body.version = existingProduct.version + 1;

    const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    res.status(200).json({ message: 'Product update successfully!!', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).json({ });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, fetchAllProduct, productFindById, updateProduct, deleteProduct }; 