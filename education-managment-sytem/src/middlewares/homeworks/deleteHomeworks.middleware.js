import ErrorHandler from "../../utils/errorhandler.js";
import { getStafs } from "../../utils/getUsers.js";
import { isHave } from "./model.js";

const deleteHomeworkMiddleware = async ( req, res ,next ) => {
  try {
      const { verifyId } = req;
      const { id } = req.params;
      const isTeacher = await getStafs(verifyId)
      const isHaveDeletedHOmework = await isHave(id)

        if (!isHaveDeletedHOmework) {
          res.status(404).send({
            status:404,
            data:null,
            msg:'homework that needs to be deleted was not found'
          })
          return
        }

      if (isTeacher.role == 'main-teacher' || isTeacher.role == 'assistant') {
        req.id = id;
        next()
        return
      }
      
      res.status(400).send({
        status:400,
        data:null,
        msg:'Homework can only be delete by the teacher or assistant teacher'
      })
      

  } catch (err) {
      new ErrorHandler(err.message, err.status)
  }
}

export default deleteHomeworkMiddleware