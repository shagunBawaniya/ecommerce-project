const userController = require('../controllers/userController');
const request = require('supertest');
const app = require('../server');

describe('User Controller', () => {
  describe('POST /login', () => {
    it('should login an existing user', async () => {
      const response = await request(app)
        .post('/api/user-service/login')
        .send({
          email: 'shagunbawaniya1997@gmail.com', // Provide an existing user's email
          password: 'shagun@1223' // Provide the correct password for the user
        });
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'User Login Successfully');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('userData');
      // Add more expectations to validate the response body if needed
    });

    it('should return 404 for non-existing user', async () => {
      const response = await request(app)
        .post('/api/user-service/login')
        .send({
          email: 'shagunbawaniya@gmail.com', // Provide a non-existing email
          password: 'test@1234' // Provide any password
        });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });

    it('should return 401 for invalid password', async () => {
      const response = await request(app)
        .post('/api/user-service/login')
        .send({
          email: 'shagunbawaniya1997@gmail.com', // Provide an existing user's email
          password: 'test@123' // Provide an incorrect password
        });

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid password');
    });
  });
});
