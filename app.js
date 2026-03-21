import express from "express";
import router from "./app/routes/authRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

app.use(express.urlencoded({ extended: true }));
app.use("/auth", router);

export default app;
