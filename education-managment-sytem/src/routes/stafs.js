import { Router } from "express";
import createStafMiddleware from "../middlewares/stafs/createStaf.middleware.js";
import createStafController from "../controllers/stafs/createStaf.controller.js";
import upload from '../utils/multer.js'
import getOneStafByIdMiddleware from "../middlewares/stafs/getOneStafById.middleware.js";
import getOneStafByIdController from "../controllers/stafs/getOneStafById.controller.js";
import getAllStafsMiddleware from "../middlewares/stafs/getAllStafs.middleware.js";
import getAllStafsController from '../controllers/stafs/getAllStafs.controller.js'
import deleteOneStafByIdMiddleware from "../middlewares/stafs/deleteOneStafById.middleware.js";
import deleteOneStafByIdController from "../controllers/stafs/deleteOneStafById.controller.js";
import updateOneStafByIdMiddleware from "../middlewares/stafs/updateOneStafById.middleware.js";
import updateOneStafByIdController from "../controllers/stafs/updateOneStafById.controller.js";
import updateStafsFeeController from "../controllers/stafs/updateStafsFee.controller.js";
import updateStafsFeeMiddleware from "../middlewares/stafs/updateStafsFee.middleware.js";
import branchesEmployeesMiddleware from "../middlewares/stafs/branchesEmployees.middleware.js";
import branchesEmployeesController from "../controllers/stafs/branchesEmploees.controller.js";
const stafs = Router() ;

stafs
    .post('/education/create/staf',upload.single('img'), createStafMiddleware, createStafController)
    .get('/education/stafs/:id', getOneStafByIdMiddleware,getOneStafByIdController)
    .get('/education/stafs', getAllStafsMiddleware,getAllStafsController )
    .get('/education/branches/employees/:id', branchesEmployeesMiddleware, branchesEmployeesController)
    .delete('/education/delete/staf/:id', deleteOneStafByIdMiddleware, deleteOneStafByIdController)
    .put('/education/update/staf/:id', updateOneStafByIdMiddleware, updateOneStafByIdController)
    .put('/education/update/staf/fee/:id', updateStafsFeeMiddleware, updateStafsFeeController)




export default stafs