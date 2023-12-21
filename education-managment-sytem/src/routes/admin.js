import { Router } from "express";
import upload from '../utils/multer.js'
import createAdminMiddleware from "../middlewares/admin/createAdmin.middleware.js";
import createAdminController from "../controllers/admin/createAdmin.controller.js";
import deleteAdminMiddleware from "../middlewares/admin/deleteAdmin.middleware.js";
import deleteAdminController from "../controllers/admin/deleteAdmin.controller.js";
import readAdminByIdMiddleware from "../middlewares/admin/readAdminById.middleware.js";
import readAdminByIdController from "../controllers/admin/readAdminById.controller.js";
import readAllAdminsMiddleware from "../middlewares/admin/readAllAdmins.middleware.js";
import readAllAdminsController from "../controllers/admin/readAllAdmins.controller.js";
import updateAdminMiddleware from "../middlewares/admin/updateAdmin.middleware.js";
import updateAdminController from "../controllers/admin/updateAdmin.controller.js";

const admin = Router();

admin
  .get('/education/admins', readAllAdminsMiddleware, readAllAdminsController)
  .get('/education/admin/:id', readAdminByIdMiddleware, readAdminByIdController)
  .post('/education/create/admin', upload.single('img'), createAdminMiddleware, createAdminController)
  .delete('/education/delete/admin/:id', deleteAdminMiddleware, deleteAdminController)
  .put('/education/update/admin/:id', updateAdminMiddleware, updateAdminController)



export default admin;