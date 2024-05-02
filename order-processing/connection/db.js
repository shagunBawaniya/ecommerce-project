// db.js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    let url = "mongodb://localhost:27017";
    let database = 'ecommerce-demo'
    await mongoose.connect(`${url}/${database}`, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
