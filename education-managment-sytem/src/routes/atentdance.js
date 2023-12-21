import { Router } from "express";
import createAtendanceMiddleware from "../middlewares/atentdane/createAtentdance.middleware.js";
import createAtentdanceController from "../controllers/atentdane/createAtentdance.controller.js";
import editAtentdanceController from "../controllers/atentdane/editAtentdance.controller.js";
import editAtentdanceMiddleware from "../middlewares/atentdane/editAtentdance.middleware.js";
import getAttendanceMiddleware from "../middlewares/atentdane/readAllAtendance.middleware.js";
import getAtentdanceController from "../controllers/atentdane/readAllAtendance.controller.js";
import getOneStudentsAtentdanceMiddleware from "../middlewares/atentdane/getOneStudentAtentdance.middleware.js";
import getOneStudentAtentdanceController from "../controllers/atentdane/getOneStudentsAtentdance.controller.js";



const Atentdance = Router()

    Atentdance
            .post('/education/atentdance/students', createAtendanceMiddleware, createAtentdanceController)
            .put('/education/atentdance/students/:id',editAtentdanceMiddleware, editAtentdanceController)
            .get('/education/atentdance/group/:id', getAttendanceMiddleware, getAtentdanceController)
            .get('/education/atentdance/group/student/:id', getOneStudentsAtentdanceMiddleware, getOneStudentAtentdanceController)


export default  Atentdance


