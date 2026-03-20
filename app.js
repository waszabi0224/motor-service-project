import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("szihelo");
});

export default app;
