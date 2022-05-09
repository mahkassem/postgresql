import { Request, Response } from 'express';
import config from '../config';
import bcrypt from 'bcrypt';
import { createUser, getByEmail } from '../entities/users/users.repo';
import jwt from 'jsonwebtoken';

const registerHanlder = async (req: Request, res: Response) => {
    try {
        let { name, color, email, password } = req.body;
        // hash password logic
        password = await bcrypt.hash(
            password + config.app.bcryptPapper,
            config.app.bcryptRounds
        );
        // save user into database
        const user = await createUser({ name, color, email, password });
        // return success message
        delete user.password;
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

const signinHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // check if user exists
        const user = await getByEmail(email);
        // generate token
        const token = jwt.sign({ sub: user.email, customClaims: 'special user' }, config.app.jwtSecret, { expiresIn: '1h' });
        // return jwt token
        res.send({ token: token });
    } catch (error) {
        res.status(500).send(error);
    }
};

export { registerHanlder, signinHandler };