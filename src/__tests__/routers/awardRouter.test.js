import request from 'supertest';
import app from '../../app';

describe('Award API', () => {
  beforeAll(async () => {
    await connectMongoose();
  });

  afterAll(async () => {
    await disconnectMongoose();
  });

  describe('Award API', () => {
    it('GET /awards - should return all awards', async () => {
      const res = await request(app).get('/awards');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /awards - should create a new award', async () => {
      const res = await request(app).post('/awards').send({
        title: 'Test Award',
        description: 'Test Award Description',
        year: 2023,
      });
      expect(res.statusCode).toEqual(201);
    });

    it('PATCH /awards/:id - should update an existing award', async () => {
      // 테스트 전 실제 award id로 바꿀 것
      const awardId = 'your_award_id_here';

      const res = await request(app).patch(`/awards/${awardId}`).send({
        title: 'Updated Test Award',
        description: 'Updated Test Award Description',
        year: 2024,
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toEqual('Updated Test Award');
      expect(res.body.description).toEqual('Updated Test Award Description');
      expect(res.body.year).toEqual(2024);
    });

    it('DELETE /awards/:id - should delete an existing award', async () => {
      // 테스트 전 실제 award id로 바꿀 것
      const awardId = 'your_award_id_here';

      const res = await request(app).delete(`/awards/${awardId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('Award deleted successfully');
    });
  });
});
