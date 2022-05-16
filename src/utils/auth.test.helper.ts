import { User } from "../entities/users/users.model";
import bcrypt from 'bcrypt';
import config from '../config';
import { createUser, getByEmail } from "../entities/users/users.repo";
import jwt from 'jsonwebtoken';

export const createTestUser = async (): Promise<{ user: User, token: string }> => {
    const user = {
        name: 'Test User',
        color: '#000000',
        email: 'auth@test.com',
        password: 'secret'
    }

    let { name, color, email, password } = user;
    // hash password logic
    password = await bcrypt.hash(
        password as string + config.app.bcryptPapper,
        config.app.bcryptRounds
    );
    // check if user already exists
    let createdUser;
    createdUser = await getByEmail(email);
    if (!createdUser) {
        // create user
        createdUser = await createUser({ name, color, email, password });
    }

    const token = jwt.sign({ sub: user.email, customClaims: 'special user' }, config.app.jwtSecret, { expiresIn: '1h' });

    return { user: createdUser, token };
};