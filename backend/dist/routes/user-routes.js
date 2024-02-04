import { Router } from "express";
import { getAllUsers, userSignUp } from "../controller/user-controller.js";
const userRoutes = Router();
userRoutes.get('/', getAllUsers);
userRoutes.post('/signup', userSignUp);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map