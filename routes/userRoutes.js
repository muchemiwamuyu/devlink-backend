import express from "express";
import { addUsers } from "../controllers/userController.js";

const router = express.Router();

router.post('/users', addUsers);


export default router;