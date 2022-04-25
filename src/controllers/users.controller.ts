import { Request, Response } from 'express';
import { create, getAll, getById } from '../entities/users/users.repo';

const getAllHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAll();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await getById((id as unknown) as number);
        if(!user) {
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
        const { name, color } = req.body;
        const user = await create({ name, color });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export { getAllHandler, getByIdHandler, createHandler };