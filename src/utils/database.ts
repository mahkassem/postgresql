import config from "../config";
import { Pool } from "pg";

const db: Pool = new Pool({
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
});

export default db;