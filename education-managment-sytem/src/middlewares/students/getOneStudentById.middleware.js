import ErrorHandler from "../../utils/errorhandler.js";
import { getOneStudentById, getStudent } from "./model.js";

const  getOneStudentByIdMiddlewre = async ( req , res , next ) => {
  try {
      const { verifyId } = req;
      const { id } = req.params;
      const student = await getOneStudentById(id)

        if (!student) { 
          res.status(404).send({
            status:404,
            data:null,
            msg:'NOT FOUND'
          })
        }

        req.student = student
        next()
      
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default getOneStudentByIdMiddlewre