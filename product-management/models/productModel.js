const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Assuming we'll store image URLs
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  version: { type: Number, default: 0 } //for optimistic locking
});

// Middleware to increment the version number before each update
ProductSchema.pre('save', function(next) {
  this.increment();
  return next();
});

const ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;