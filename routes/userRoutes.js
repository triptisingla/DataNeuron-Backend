import express from "express";
import { register, update } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.put("/update", update);


export default router;
