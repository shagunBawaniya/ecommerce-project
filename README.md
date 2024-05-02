# ecommerce-project

Introduction
- This project aims to create a scalable and resilient e-commerce platform using microservices architecture. It leverages Node.js and Express for building the services and MongoDB as the database.

Project Structure
- The project is structured into three main services, each containing its own set of files:
    - User authentication: Allows users to register, login, and manage their accounts.
    - Product management: Enables the creation, retrieval, update, and deletion of products.
    - Order processing: Facilitates the creation and management of orders.

Endpoints
- The following endpoints are available for each service:
    - User Service:
        - POST /api/user-service/register: Register a new user.
        - POST /api/user-service/login: Log in an existing user.
    - Product Service:
        - POST /api/product-service: Create a new product.
        - GET /api/product-service: Get all products.
        - GET /api/product-service/:id: Get a product by ID.
        - PUT /api/product-service/:id: Update a product.
        - DELETE /api/product-service/:id: Delete a product.
    - Order Service:
        - POST /api/order-service: Place a new order.
        - GET /api/order-service: Get all orders.
        - GET /api/order-service/:id: Get an order by ID.
        - PUT /api/order-service/:id: Update an order.

Error Handling
- Comprehensive error handling is implemented throughout the services to ensure proper error messages are returned to clients in case of failures. Error responses include appropriate HTTP status codes and descriptive error messages.

Concurrency Control
- Concurrency control mechanisms are implemented in the product management service to handle concurrent access to product information. This ensures that multiple users can safely read and update product data without conflicts. using with -> optimistic locking

Technology Stack
- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens) for authentication
- bcrypt.js for password hashing
- Jest for unit testing

Access the services at the following URLs:
- User authentication service: http://localhost:3000
- Product management service: http://localhost:3001
- Order processing service: http://localhost:3002


