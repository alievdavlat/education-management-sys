import { Router } from "express";
import readSelfAccountMiddleware from "../middlewares/readSelfAccount.middleware.js";
import readSelfAccountController from "../controllers/readSelfAccount.controller.js";
import addteacherToCourseMiddleware from "../middlewares/main/addTeacherToCourse.middleware.js";
import addteacherToCourseController from "../controllers/main/addTeacherToCourse.controller.js";
import addStudentToGroupMiddleware from "../middlewares/main/addToGroupStudent.middleware.js";
import addStudentToGroupController from "../controllers/main/addToGroupStudent.controller.js";
import disabledStudntsMiddleware from "../middlewares/main/disabledStudents.middleware.js";
import disabledStudntsController from "../controllers/main/disabledStudents.controller.js";
import blockCompnyMiddleware from "../middlewares/main/disabledCompany.middleware.js";
import blockCompanyController from "../controllers/main/disabledCompany.controller.js";
import changeStudentPaymentStatusMiddleware from "../middlewares/main/changeStudentPaymentStatus.middleware.js";
import changeStudentPaymentStatusController from "../controllers/main/changeStudentPaymentStatus.controller.js";
import changeCompanyPaymentStatusMiddleware from "../middlewares/main/changeCompanyPaymentStatus.middleware.js";
import changeCompanyPaymentStatusController from "../controllers/main/changeCompanyPaymentStatus.controller.js";

const mainRouter = Router();

mainRouter
.get('/education/account',readSelfAccountMiddleware,readSelfAccountController)
.post('/education/course/add/staf', addteacherToCourseMiddleware, addteacherToCourseController)
.post('/education/group/add/student', addStudentToGroupMiddleware, addStudentToGroupController)
.post('/education/block/student/:id', disabledStudntsMiddleware, disabledStudntsController)
.post('/education/block/company/:id', blockCompnyMiddleware, blockCompanyController)
.post('/education/payment/student/:id', changeStudentPaymentStatusMiddleware, changeStudentPaymentStatusController)
.post('/education/payment/company/:id', changeCompanyPaymentStatusMiddleware, changeCompanyPaymentStatusController )


export default mainRouter;
