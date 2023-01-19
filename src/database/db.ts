import pg from "pg";

const { Pool } = pg;

export const connectionDB = new Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Felipe1210",
    database: "POC-drivent-typescript"
})