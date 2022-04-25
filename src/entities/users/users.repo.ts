import DB from '../../utils/database';
import { User } from './users.model';

const getAll = async (): Promise<User[]> => {
    const queryText = `SELECT * FROM users`;
    const result = await DB.query(queryText);
    return result.rows;
};

const getById = async (id: number): Promise<User> => {
    const queryText = `SELECT * FROM users WHERE id = $1`;
    const result = await DB.query(queryText, [id]);
    return result.rows[0];
}

const create = async (user: User): Promise<User> => {
    const queryText = `INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *`;
    const result = await DB.query(queryText, [user.name, user.color]);
    return result.rows[0];
}

export { getAll, getById, create };