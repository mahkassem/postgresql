import { User } from '../entities/users/users.model';
import {
    createUser,
    getAll,
    getById
} from '../entities/users/users.repo';

let testUser: User;
let testId: number;

describe('Users Repository', () => {
    it('Should create a user',async () => {
        const user = {
            name: 'Test User',
            color: '#000000',
            email: 'test1@test.com',
            password: 'test'
        };

        const createdUser = await createUser(user);
        testUser = createdUser;
        testId = createdUser.id as number;
        delete createdUser.id;
        expect(createdUser).toEqual(user);
    });

    it('Should get all users', async () => {
        const users = await getAll();
        expect(users.length).toBeGreaterThan(0);
    });

    it('Should get a user by id', async () => {
        const user = await getById(testId);
        expect(user.id).toEqual(testId);
    });

});