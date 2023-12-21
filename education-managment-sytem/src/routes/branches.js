import { Router } from "express";
import  upload  from '../utils/multer.js'
import createBranchMiddleware from "../middlewares/branches/createBranch.middleware.js";
import createBranchContrller from "../controllers/branches/createBranch.controller.js";
import getAllBranchesMiddleware from "../middlewares/branches/getAllBranches.middleware.js";
import getAllBranchesController from "../controllers/branches/getAllBranches.controller.js";
import getOneBranchByIdMiddleware from "../middlewares/branches/getOneBranchById.middleware.js";
import getOneBrancheByIdController from "../controllers/branches/getOneBranchById.controller.js";
import deleteOneByIdMiddleware from "../middlewares/branches/deletOneBranchByid.middleware.js";
import deleteOneByIdController from "../controllers/branches/deleteOneById.controller.js";
import updateOnebranchByIdMiddleware from "../middlewares/branches/updateOneById.middleware.js";
import updateOnebranchByIdController from "../controllers/branches/updateOneById.controller.js";


const branches = Router()

branches
    .post('/education/create/branch', upload.single('branch_img'),createBranchMiddleware, createBranchContrller)
    .get('/education/companies/branches', getAllBranchesMiddleware, getAllBranchesController)
    .get('/education/companies/branches/:id', getOneBranchByIdMiddleware, getOneBrancheByIdController)
    .put('/education/update/branch/:id', updateOnebranchByIdMiddleware, updateOnebranchByIdController)
    .delete('/education/delete/branch/:id', deleteOneByIdMiddleware, deleteOneByIdController)


    
export default branches