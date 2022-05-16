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

const getByEmail = async (email: string): Promise<User> => {
    const queryText = `SELECT * FROM users WHERE email = $1`;
    const result = await DB.query(queryText, [email]);
    return result.rows[0];
}

const createUser = async (user: User): Promise<User> => {
    const queryText = `INSERT INTO users (name, color, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await DB.query(queryText, [user.name, user.color, user.email, user.password]);
    return result.rows[0];
}

const deleteUser = async (id: number): Promise<boolean> => {
    const queryText = `DELETE FROM users WHERE id = $1`;
    const result = await DB.query(queryText, [id]);
    return result.rowCount > 0;
};

export { getAll, getById, getByEmail, createUser, deleteUser };