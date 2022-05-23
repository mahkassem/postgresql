import { Request, Response } from 'express';
import { createUser, getAll, getById } from '../entities/users/users.repo';
import { PaginatedQuery } from '../models/query.models';
import { uploadAvatarAsync } from '../utils/upload';

const getAllHandler = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query as PaginatedQuery;
        const users = await getAll(page, limit);
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getById((id as unknown) as number);
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

const createHandler = async (req: Request, res: Response) => {
    try {
        const { name, color, email, password } = req.body;
        // handle avatar file upload
        const avatar = await uploadAvatarAsync(req);
        const user = await createUser({ name, color, avatar, email, password });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export { getAllHandler, getByIdHandler, createHandler };