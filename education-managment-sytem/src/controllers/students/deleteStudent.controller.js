import { deletStudent } from "../../middlewares/students/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const deleteStudentController = async ( req , res ) => {
try {
  const { id } = req;

  const deletedStudent = await deletStudent(id)

        res.status(200).send({
          status:200,
          data:deletedStudent,
          msg:'Ok'
        })

} catch (err) {
  new ErrorHandler(err.message, err.status);
}

}

export default deleteStudentController