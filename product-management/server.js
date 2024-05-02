const express = require('express');
const cluster = require('cluster');
const os = require('os');
const connectDB = require('./connection/db');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    console.log(`Master ${process.pid} is running`);
  
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });
} else {
    const app = express();

    app.use(express.json());

    // Connect to MongoDB
    connectDB();

    // Load routes
    const productRoutes = require('./routes/ProductRoutes');
    app.use('/api/product-service', productRoutes);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));

}