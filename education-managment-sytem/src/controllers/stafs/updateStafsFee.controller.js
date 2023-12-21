import { updateStafsFee } from "../../middlewares/stafs/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const updateStafsFeeController = async ( req , res ) => {
  try {
    const {stafId, fee } = req;

    const updatedStaffee = await updateStafsFee(stafId, fee)

    res.status(200).send({
      status:200,
      data:updatedStaffee,
      msg:'updated'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default updateStafsFeeController