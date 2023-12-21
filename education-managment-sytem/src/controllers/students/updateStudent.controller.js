import { updateStudent } from "../../middlewares/students/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const updateStudentController = async ( req , res ) => {
  try {

      const {id,  username , branch_id } = req;
      const updatedStudent = await updateStudent(id,username, branch_id)

      res.status(200).send({
        status:200,
        data:updatedStudent,
        msg:'updated'
      })
    
  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default  updateStudentController