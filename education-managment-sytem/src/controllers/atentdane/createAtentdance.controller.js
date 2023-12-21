import { createAtnentdance } from "../../middlewares/atentdane/model.js";
import ErrorHandler from "../../utils/errorhandler.js";




const createAtentdanceController  = async ( req, res ) => {
  try {
    const { data } = req;
    const atentdanceStudents = await createAtnentdance(data.studentId, data.is_present)
    res.status(200).send({
      status:200,
      data:atentdanceStudents,
      msg:'created Atentdance for students'
    })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default createAtentdanceController 