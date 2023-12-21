import { updateStudentAtentdance } from "../../middlewares/atentdane/model.js";
import ErrorHandler from "../../utils/errorhandler.js";




const editAtentdanceController  = async ( req, res ) => {
  try {
    const { data } = req;
    const editAtentdanceStudents = await updateStudentAtentdance(data.id, data.is_present)
    res.status(200).send({
      status:200,
      data:editAtentdanceStudents,
      msg:' Atentdance succesfuly updated for students'
    })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default editAtentdanceController 