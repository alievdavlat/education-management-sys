import { Router } from "express";
import createGroupMiddleware from "../middlewares/groups/createGroup.middleware.js";
import createGroupController from "../controllers/groups/createGroups.controller.js";
import updateGroupsMiddleware from "../middlewares/groups/updateGroups.middleware.js";
import updateGroupsController from "../controllers/groups/updaeGroups.controller.js";
import deleteGroupsMiddlware from "../middlewares/groups/deleteGroups.middlware.js";
import deleteGroupsController from "../controllers/groups/deletGroups.controller.js";
import getAllGroupsMiddleware from "../middlewares/groups/getAllGroups.middleware.js";
import getAllGroupsController from "../controllers/groups/getAllGroups.controller.js";
import getOneGroupMiddleware from "../middlewares/groups/getOneGroups.middleware.js";
import getOneGroupController from "../controllers/groups/getOneGroup.controller.js";
import getAllGroupsForTeacherMiddleware from "../middlewares/groups/getAllgroupsForTeachers.middleware.js";
import getAllGroupsForTeacherController from "../controllers/groups/getAllGroupsForTeachers.controller.js";


const groups = Router()

groups
    .post('/education/create/groups', createGroupMiddleware, createGroupController)
    .put('/education/update/groups/:id',updateGroupsMiddleware, updateGroupsController)
    .delete('/education/delete/groups/:id', deleteGroupsMiddlware, deleteGroupsController)
    .get('/education/groups', getAllGroupsMiddleware, getAllGroupsController)
    .get('/education/groups/:id', getOneGroupMiddleware, getOneGroupController)
    .get('/education/teachers/groups', getAllGroupsForTeacherMiddleware, getAllGroupsForTeacherController)

export default groups