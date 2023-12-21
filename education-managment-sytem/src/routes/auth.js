import { Router } from "express";
import loginMiddleware from "../middlewares/auth/login/login.middleware.js  ";
import loginController from "../controllers/auth/login.controller.js";

const auth = Router()

auth
    .post('/education/login',loginMiddleware, loginController)
    
    export default auth