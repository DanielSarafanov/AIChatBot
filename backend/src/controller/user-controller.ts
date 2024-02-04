import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import {hash, compare} from 'bcrypt';

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
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send('User is already registered with this email.');
        }

        const encryptedPassword = hash(password, 10);
        const user = new User({name, email, encryptedPassword });
        await user.save();
        return res.status(200).json({ message:'OK', id: user.id });
    } catch (error) {
        return res.status(400).json({ message: 'ERROR', cause: error.message});
    }
}

//user login
export const userLogin = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send('There is no current user associated with this email.');
        }

        const isPasswordCorrect = await compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(403).send('Incorrect Password');
        }

        return res.status(200).json({ message:'OK', id: user.id });
    } catch (error) {
        return res.status(400).json({ message: 'ERROR', cause: error.message});
    }
}