//endpointok kezelése,

import express from 'express';
import pool from './config/db.js';

const app = express();

pool.query("SELECT NOW()", (err, result) => {
    if(err) {
        console.log("hiba: ", err);
    } else {
        console.log("ok", result.rows);
    }
});

app.get('/', (req, res) => {
    res.send("szihelo");
});

export default app;
