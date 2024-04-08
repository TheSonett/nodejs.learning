import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users,
    });
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);

    res.json({
        success: true,
        user,
    });
}

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    await User.create({name, email, password});

    res.status(201).json({
        success: true,
        message: "New registration completed!",
    });
}