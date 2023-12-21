import { Router } from "express";
import createEducationMiddleware from "../middlewares/company/createEdu.middlewares.js";
import createEducationController from "../controllers/company/createEducation.controller.js";
import upload from "../utils/multer.js";
import updateCompanyMiddleware from "../middlewares/company/updateComany.middleware.js";
import updateCompanyController from "../controllers/company/updateCompany.controller.js";
import deleteCompanyMiddleware from "../middlewares/company/deletecompany.middleware.js";
import deleteCompanyController from "../controllers/company/deleteCompany.controller.js";
import getSelfCompanyMiddleware from "../middlewares/company/getSelfCompany.midlleware.js";
import getSelfCompanyController from "../controllers/company/getSelfCompany.controller.js";
import getAllCompanyMiddleware from "../middlewares/company/getAllCompany.middleware.js";
import getAllCompanyCOntroller from "../controllers/company/getAllCompany.controller.js";
import getOneCompanyByIdMiddleware from '../middlewares/company/getOneCompanyById.middleware.js'
import getOneCOmpanyByIdController from '../controllers/company/getOneCompanyById.controller.js'


const company = Router()



company
      .get('/education/company/all', getAllCompanyMiddleware, getAllCompanyCOntroller)
      .get('/education/company/:id',getOneCompanyByIdMiddleware, getOneCOmpanyByIdController )
      .get('/education/company', getSelfCompanyMiddleware, getSelfCompanyController)
      .post('/education/create/company',upload.single('logo'), createEducationMiddleware, createEducationController)
      .put('/education/update/company/:id', updateCompanyMiddleware, updateCompanyController)
      .delete('/education/delete/company/:id', deleteCompanyMiddleware, deleteCompanyController)
export default company