import express from "express";
import { connectDB } from "./data/database.js";
import userRouter from "./routes/user.js";
import {config} from "dotenv";

export const app = express();
config({
    path: "./data/config.env"
});
connectDB();

// adding middlewares
app.use(express.json());
app.use(userRouter);


app.get("/", (req, res) => {
    res.send("<h1>Page is Working!</h1>");
});