import { userAuthService } from '../../services/userService';

async function generateTestToken(email, password) {
  const user = await userAuthService.getUser({ email, password });

  if (user.errorMessage) {
    throw new Error(user.errorMessage);
  }

  return user.token;
}

const testUserEmail = 'test@supertest.elice.io'; // insert test user email
const testUserPassword = 'test'; // insert test user password

describe('generateTestToken', () => {
  it('should return a JWT token', async () => {
    const token = await generateTestToken(testUserEmail, testUserPassword);
    expect(token).toEqual(expect.any(String));
  });
});

export { generateTestToken };
