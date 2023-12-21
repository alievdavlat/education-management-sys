import { getOneStudentAtentdance } from "../../middlewares/atentdane/model.js";
import ErrorHandler from "../../utils/errorhandler.js";




const getOneStudentAtentdanceController  = async ( req, res ) => {
  try {
    const { id } = req;
    const atentdanceStudents = await getOneStudentAtentdance(id)
    res.status(200).send({
      status:200,
      data:atentdanceStudents,
      msg:'ok'
    })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default getOneStudentAtentdanceController 