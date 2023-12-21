import { disabledStudent } from "../../middlewares/main/model.js";
import ErrorHandler from "../../utils/errorhandler.js"


const disabledStudntsController  = async ( req , res ) => {
  try {
    const { id, blocked } = req;
    let msg = 'student successfuly unblocked'

    const blockedStudent = await disabledStudent(id, blocked)
    
    if (blocked) {
      msg = 'student successfuly blocked'
    }

    res.status(200).send({
      status:200,
      data:blockedStudent,
      msg
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
};

export default  disabledStudntsController 