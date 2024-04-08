import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});


export const User = mongoose.model("user", userSchema);