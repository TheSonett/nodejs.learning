import express from "express";
import { getAllUsers, getUserById, register } from "../controllers/user.js";

const router = express.Router();

router.get("/getUsers", getAllUsers);
router.post("/register", register);

router.get("/userId/:id", getUserById)
router.put("/userId/:id", getUserById)
router.delete("/userId/:id", getUserById)

export default router;