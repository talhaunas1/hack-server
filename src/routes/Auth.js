import express from "express";
import { login, registerUser } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", login);

export default router;