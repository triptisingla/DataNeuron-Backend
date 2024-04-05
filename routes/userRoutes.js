import express from "express";
import { register, update, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);
router.put("/update", update);
router.get("/get", getUsers);

export default router;
