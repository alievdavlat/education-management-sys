import { Router } from "express";
import upload from '../utils/multer.js'
import createCourseMiddleware from "../middlewares/courses/createCourse.middleware.js";
import createCourseController from "../controllers/courses/createCourse.controller.js";
import deleteCourseMiddleware from "../middlewares/courses/deleteCourse.middleware.js";
import deleteCourseController from "../controllers/courses/deleteCourse.controller.js";
import updateCourseMiddleware from "../middlewares/courses/updateCourse.middleware.js";
import updateCourseController from "../controllers/courses/updateCourse.controller.js";
import getCourseMiddleware from "../middlewares/courses/getCourse.middleware.js";
import getCourseController from "../controllers/courses/getCourse.controller.js";
import getAllCourseMiddleware from "../middlewares/courses/getAllCourse.middleware.js";
import getAllCourseController from "../controllers/courses/getAllCourse.controller.js";

const courses = Router()


  courses
        .post('/education/create/course',upload.single('img'), createCourseMiddleware, createCourseController)
        .delete('/education/delete/course/:id',deleteCourseMiddleware, deleteCourseController)
        .put('/education/update/course/:id', updateCourseMiddleware, updateCourseController)
        .get('/education/course/:id', getCourseMiddleware, getCourseController)
        .get('/education/courses', getAllCourseMiddleware, getAllCourseController)


export default  courses