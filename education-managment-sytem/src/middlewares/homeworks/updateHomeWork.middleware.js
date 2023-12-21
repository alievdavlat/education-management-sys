import ErrorHandler from "../../utils/errorhandler.js";
import { getStafs } from "../../utils/getUsers.js";
import { isHave } from "./model.js";


const updateHomeworkMiddleware = async ( req , res, next ) => {
  try {
      const { verifyId } = req;
      const { title, body } = req.body;
      const { id } = req.params;
      const isTeacher = await getStafs(verifyId)
      const isHaveORnO = await isHave(id)
      
      if (!title || !body) {
        res.status(204).send({
          status:204,
          data:null,
          msg:'values required'
        })
        return
      }



      if (!isHaveORnO) {
        res.status(404).send({
          status:404,
          data:null,
          msg:'the changeable homework was not found'
        })
        return
      }



      if (isTeacher.role == 'main-teacher' || isTeacher.role == 'assistant' ) {
          const data = { title, body, id }
          req.data = data
          next()
          return
      }

      res.status(400).send({
        status:400,
        data:null,
        msg:'Homework can only be update by the teacher or assistant teacher'
      })
      

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default updateHomeworkMiddleware