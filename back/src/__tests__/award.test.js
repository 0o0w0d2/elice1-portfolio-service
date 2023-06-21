import request from 'supertest';
import { app } from '../app';
import { generateTestToken } from './helpers/testHelpers';

let testToken;
const testUserEmail = 'test@supertest.elice.io'; // insert test user email
const testUserPassword = 'test'; // insert test user password

describe('Awards API', () => {
  beforeAll(async () => {
    testToken = await generateTestToken(testUserEmail, testUserPassword);
  });

  it('GET /awards/:userId - Should return all awards for the specified user', async () => {
    // Get the current user's ID
    const userRes = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${testToken}`);
    const currentUserId = userRes.body.id;

    const res = await request(app)
      .get(`/awards/${currentUserId}`)
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.status).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('POST /awards - Should create a new award for the current user', async () => {
    const res = await request(app)
      .post('/awards')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        title: 'Test Award',
        description: 'Test Award Description',
        year: 2023,
      });

    expect(res.status).toEqual(201);
  });
});
