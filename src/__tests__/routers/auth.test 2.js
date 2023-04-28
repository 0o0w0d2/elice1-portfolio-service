const request = require('supertest');
const app = require('../../app');

describe('Test the user authentication routes', () => {
  test('It should respond with a 200 status code and a token when a user logs in', async () => {
    const response = await request(app).post('/user/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
