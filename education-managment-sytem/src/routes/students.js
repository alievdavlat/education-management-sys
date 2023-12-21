import { Router } from "express";
import createStudentmiddleware from "../middlewares/students/createStudent.middleware.js";
import createStudentController from "../controllers/students/createStudent.controller.js";
import getOneStudentByIdController from "../controllers/students/getOneStudentById.controller.js";
import getOneStudentByIdMiddlewre from "../middlewares/students/getOneStudentById.middleware.js";
import getAllStudentsController from "../controllers/students/getAllStudents.controller.js";
import getAllStudentsMiddleware from "../middlewares/students/getAllStudents.middleware.js";
import getAllStudentsForTeachersMiddleware from "../middlewares/students/getStudentsForTeachers.middleware.js";
import getAllStudentsForTeachersController from "../controllers/students/getStudentsForTeahcers.controller.js";
import updateStudentMiddleware from "../middlewares/students/updateStudent.middleware.js";
import updateStudentController from "../controllers/students/updateStudent.controller.js";
import deleteStudentMiddleware from "../middlewares/students/deleteStudent.middleware.js";
import deleteStudentController from "../controllers/students/deleteStudent.controller.js";


const students = Router()


students
      .post('/education/create/student', createStudentmiddleware, createStudentController)
      .get('/education/student/:id', getOneStudentByIdMiddlewre, getOneStudentByIdController)
      .get('/education/students', getAllStudentsMiddleware, getAllStudentsController)
      .get('/education/teachers/students', getAllStudentsForTeachersMiddleware, getAllStudentsForTeachersController)
      .put('/education/update/student/:id', updateStudentMiddleware, updateStudentController)
      .delete('/education/delete/student/:id', deleteStudentMiddleware, deleteStudentController)


      
export default  students