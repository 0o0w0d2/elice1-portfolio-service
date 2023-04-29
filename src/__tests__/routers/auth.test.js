const request = require('supertest');
const app = require('../../app');

describe('Test the user authentication routes', () => {
  test('It should respond with a 201 status code when a new user registers', async () => {
    const response = await request(app).post('/user/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(201);
  });

  test('It should respond with a 200 status code and a token when a user logs in', async () => {
    const response = await request(app).post('/user/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
describe('Simple Test', () => {
  test('1 + 1 should equal 2', () => {
    expect(1 + 1).toBe(2);
  });
});
