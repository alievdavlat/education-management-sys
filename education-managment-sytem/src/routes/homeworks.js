import { Router } from "express";
import createHomeworksMiddleware from "../middlewares/homeworks/createHomeworks.middleware.js";
import createHomeworksController from "../controllers/homeworks/createHomework.controller.js";
import updateHomeworkMiddleware from "../middlewares/homeworks/updateHomeWork.middleware.js";
import updateHomeworksController from "../controllers/homeworks/updateHomework.controller.js";
import deleteHomeworkMiddleware from "../middlewares/homeworks/deleteHomeworks.middleware.js";
import deleteHomeWorkController from "../controllers/homeworks/deleteHomeworks.controller.js";
import getAllHomeworkAtGroupMiddleware from "../middlewares/homeworks/getAllHomeworkAtGroup.middleware.js";
import getAllHomeworkAtGroupController from "../controllers/homeworks/getAllHomeworkAtGroup.controller.js";
import getOneHomeworkMiddleware from "../middlewares/homeworks/getOneHomework.middleware.js";
import getOneHomeworkCOntroller from "../controllers/homeworks/getOneHomework.controller.js";


const homeworks = Router()

    homeworks
        .post('/education/homeworks/:id', createHomeworksMiddleware,createHomeworksController )
        .put('/education/update/homeworks/:id', updateHomeworkMiddleware, updateHomeworksController)
        .delete('/education/delete/homeworks/:id', deleteHomeworkMiddleware, deleteHomeWorkController)
        .get('/education/homeworks/group/:id', getAllHomeworkAtGroupMiddleware, getAllHomeworkAtGroupController)
        .get('/education/homeworks/group/task/:id', getOneHomeworkMiddleware, getOneHomeworkCOntroller)

        

export default  homeworks