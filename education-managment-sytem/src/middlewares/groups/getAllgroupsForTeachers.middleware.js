import ErrorHandler from "../../utils/errorhandler.js";
import { getStafs } from "../../utils/getUsers.js";
import { getAllGroupForAssistant, getAllGroupForTeacher } from "./model.js";


const getAllGroupsForTeacherMiddleware = async(req, res, next) => {
  try {

    const { verifyId } = req;
    const { column , offset , limit } = req.body;
    const isStaf = await getStafs(verifyId)


  if (isStaf.role == 'main-teacher') {
    const allGroups = await getAllGroupForTeacher(verifyId, column, offset ,limit)
      req.allGroups = allGroups
      next()
      return
  }


  
  if (isStaf.role == 'assistant') {
    const allGroups = await getAllGroupForAssistant(verifyId, column, offset ,limit)
      req.allGroups = allGroups
      next()
      return
  }

  
 

  res.status(400).send({
    status:400,
    data:null,
    msg:'you cannot create group'
  })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default getAllGroupsForTeacherMiddleware