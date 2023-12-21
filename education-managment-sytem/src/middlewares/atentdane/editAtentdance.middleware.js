import ErrorHandler from "../../utils/errorhandler.js";
import { getStafs } from "../../utils/getUsers.js";


const editAtentdanceMiddleware = async ( req , res , next ) => {
  try {
      const { verifyId } = req;
      const { id } = req.params;
      const { is_present } = req.body;

      const isTeacher =  await getStafs(verifyId)

      if (isTeacher.role == 'main-teacher' || isTeacher.role == 'assistant') {
        const data = {id, is_present }
        req.data = data
        next()
        return
      }
    
    
      res.status(400).send({
        status:400,
        data:null,
        msg:'bad request'
      })
    
      
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default editAtentdanceMiddleware