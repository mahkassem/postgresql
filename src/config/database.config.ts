import dotenv from "dotenv";

dotenv.config();

const env = process.env.ENV || "test";

const dbConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    database: process.env.PG_DB,
}

if(env === 'test') dbConfig.database = process.env.PG_TEST_DB;

export default dbConfig;