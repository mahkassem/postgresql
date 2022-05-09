import { Request, Response, NextFunction } from 'express';
import { getByEmail } from '../entities/users/users.repo';
import bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';

const signinValidator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        // check if user exists
        const userExists = await getByEmail(email);
        if (!userExists) {
            res.status(401).send('User does not exist');
            return;
        }
        // check if password is correct: compare hashed password with password from database
        const isPasswordCorrect = await bcrypt.compare(password + config.app.bcryptPapper, userExists.password as string);
        if (!isPasswordCorrect) {
            res.status(401).send('Password is not correct');
            return;
        }

        next();
    } catch (error) {
        res.status(500).send(error);
    }
}

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).send('No token provided');
            return;
        }

        // verify token
        const tokenArray = token.split(' ');
        const verify = jwt.verify(tokenArray[1], config.app.jwtSecret);

        if (!verify) {
            res.status(401).send('Token is not valid');
            return;
        }

        // check if user exists
        const { sub } = verify as { sub: string };
        const userExists = await getByEmail(sub);
        if (!userExists) {
            res.status(401).send('User does not exist');
            return;
        }

        // store user in request object
        res.locals.user = userExists;

        next();

    } catch (error) {
        res.status(500).send(error);
    }
}

export { signinValidator, authGuard };