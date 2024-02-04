import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import {hash, compare} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

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

        //validate
        if (existingUser) {
            return res.status(400).send('User is already registered with this email.');
        }

        //create new user if user does not previously exist
        const encryptedPassword = hash(password, 10);
        const user = new User({name, email, encryptedPassword });
        await user.save();

        //create new auth token AND clear old cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, { 
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({ message:'OK', id: user._id.toString() });
    } catch (error) {
        return res.status(400).json({ message: 'ERROR', cause: error.message});
    }
}

//user login
export const userLogin = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        //validate
        if(!user){
            return res.status(400).send('There is no current user associated with this email.');
        }

        const isPasswordCorrect = await compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(403).send('Incorrect Password');
        }

        //create new auth token AND clear old cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: 'localhost',
            signed: true,
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token, { 
            path: '/',
            domain: 'localhost',
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({ message:'OK', id: user._id.toString()});
    } catch (error) {
        return res.status(400).json({ message: 'ERROR', cause: error.message});
    }
}