import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import {hash} from 'bcrypt';

//get all users
export const getAllUsers = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users});
    } catch (error) {
        return res.status(400).json({ message: 'ERROR', cause: error.message});
    }
}

//user sign up
export const userSignUp = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const encryptedPassword = hash(password, 10);
        const user = new User({name, email, encryptedPassword });
        await user.save();
        return res.status(200).json({ message:'OK', id: user.id });
    } catch (error) {
        return res.status(400).json({ message: 'ERROR', cause: error.message});
    }
}