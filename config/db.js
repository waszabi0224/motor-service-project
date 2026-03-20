//csatlakozik a PostgreSQL-hez (Docker Dekstop konténer + pgAdmin)

import { Pool } from 'pg';

const pool = new Pool({
    host: "localhost",
    post: 5432,
    user: "postgres",
    password: "kutyagumi",
    database: "motor-service",
});

export default pool;
