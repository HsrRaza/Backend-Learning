import express from "express"

import { registerUser, verifyUser , login , getMe, logoutUser,forgetPassword,resetPassword} from "../controller/user.controller.js";

import { isLoggedIn } from "../middleWare/auth.middleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", login);

router.post("/me", isLoggedIn, getMe)



export default router



