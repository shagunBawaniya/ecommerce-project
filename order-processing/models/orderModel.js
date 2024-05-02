const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true, enum: ['created', 'processing', 'shipped', 'delivered', 'cancelled'] },
  createdAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;