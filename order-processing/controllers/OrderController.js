const OrderModel = require('../models/orderModel');
const ProductModel = require('../models/productModel');
 
const createOrder = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
 
    const order = new OrderModel({
      userId: req.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      totalPrice: product.price * req.body.quantity,
      status: 'created'
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'order added successfully', id: savedOrder._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId });
    //const orders = await OrderModel.find({ userId: "66322be70da2b83ce609beef" });
    res.status(200).json({ message: 'All orders fetched!!', orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to access this order' });
    }

    res.status(200).json({ message: 'Order fetched successfully!!', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to update this order' });
    }

    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.status(200).json({ message: 'Order update successfully!!', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder }; 

