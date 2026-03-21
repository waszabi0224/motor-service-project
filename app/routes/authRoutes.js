import express from "express";
import { showRegisterPage, registerUser, showloginPage, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/register", showRegisterPage);
router.post("/register", registerUser);

router.get("/login", showloginPage);
router.post("/login", loginUser);

export default router;
