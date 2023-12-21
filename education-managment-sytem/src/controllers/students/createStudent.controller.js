import { createNewStudent } from "../../middlewares/students/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const createStudentController = async ( req , res ) => {
  try {
    const { data } = req;
    const createdStudent = await createNewStudent(
      data.username,
      data.name , 
      data.last_name, 
      data.gender,
      data.dob, 
      data.branch_id,
      data.company_id
    )

      res.status(201).send({
        status:201,
        data:createdStudent,
        msg:'created'
      })


  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default  createStudentController
