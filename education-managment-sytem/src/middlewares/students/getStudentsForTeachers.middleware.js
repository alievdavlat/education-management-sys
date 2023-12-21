import ErrorHandler from "../../utils/errorhandler.js";
import { getStafs } from "../../utils/getUsers.js";
import { getAllStudentsForAssistant, getAllStudentsForTeacher } from "./model.js";

const getAllStudentsForTeachersMiddleware = async (req, res , next ) => {
  try {
    const { verifyId } = req;
    const isTeacher = await getStafs(verifyId)
    const { column , offset, limit } = req.body;
    if (isTeacher.role == 'main-teacher') {
        const allstudents = await getAllStudentsForTeacher(verifyId,column , offset, limit)
        req.allstudents = allstudents
        next()
        return
     }  

    if (isTeacher.role == 'assistant') {
      const allstudents = await getAllStudentsForAssistant(verifyId, column, offset, limit)
      req.allstudents = allstudents
      next()
      return
    }  

    res.status(400).send({
      status:400,
      data:null,
      msg:'you cannot acces'
    })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  getAllStudentsForTeachersMiddleware