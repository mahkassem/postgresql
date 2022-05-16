import supertest from 'supertest';
import app from '../app';
import { User } from '../entities/users/users.model';
import { createTestUser } from '../utils/auth.test.helper';

let testUser: { user: User, token: string };

describe('Users API', () => {
    beforeAll(async () => {
        testUser = await createTestUser();
    });

    it('Should return all users', async () => {
        const request = await supertest(app)
                                .get('/api/users')
                                .set('Authorization', `Bearer ${testUser.token}`)
                                .send();

        expect(request.status).toBe(200);
        expect(request.body.length).toBeGreaterThan(0);
    });
});