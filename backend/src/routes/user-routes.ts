import { Router } from "express";
import { getAllUsers, userSignUp } from "../controller/user-controller.js";
import { signUpValidator, validate } from '../utils/validators.js'

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', validate(signUpValidator),userSignUp)

export default userRoutes;