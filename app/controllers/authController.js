import { findUserByEmail, createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";

const showRegisterPage = (req, res) => {
    res.render("pages/register", {
        error: null
    });
};

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body;

        if(!first_name || !last_name || !email || !password || !phone) {
            return res.status(400).render("pages/register", {
                error: "Minden mező kitöltése kötelező!"
            });
        }

        const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/;
        if(!pwd_regex.test(password)) {
            return res.status(400).render("pages/register", {
                error: "A jelszónak tartalmaznia kell legalább 8, de maximum 24 karaktert, valamint egy kisbetűt, egy nagybetűt és egy speciális karaktert!"
            });
        }

        const existingUser = await findUserByEmail(email);
        if(existingUser) {
            return res.status(409).render("pages/register", {
                error: "Ez az email cím már létezik!"
            });
        }

        const hashPassword = bcrypt.hashSync(password, 12);

        const user = await createUser({ first_name, last_name, email, password: hashPassword, phone });

        return res.redirect("/auth/login");
    } catch(error) {
        return res.status(500).render("pages/register", {
            error: "Hiba történt a regisztráció során!"
        });
    }
};

const showloginPage = (req, res) => {
    res.render("pages/login", {
        error: null
    });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).render("pages/login", {
                error: "Minden mező kitöltése kötelező!"
            });
        }

        const existingUser = await findUserByEmail(email);

        if(!existingUser) {
            return res.status(404).render("pages/login", {
                error: "Nincs ilyen felhasználó!"
            });
        }

        const validPassword = bcrypt.compare(password, existingUser.password);
        if(!validPassword) {
            return res.status(403).render("pages/login", {
                error: "Hibás email cím vagy jelszó!"
            });
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        console.log(req.session.user);
        return res.redirect("/home");
    } catch(error) {
        return res.status(500).render("pages/login", {
            error: "Hiba történt a bejelentkezés során!"
        })
    }
};

export {
    showRegisterPage,
    registerUser,
    showloginPage,
    loginUser
};
