import { deleteOneByID } from "../../middlewares/branches/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const deleteOneByIdController = async ( req , res ) => {
  try {
    const { branchId } = req;
    const deletedbranch = await deleteOneByID(branchId)

    res.status(200).send({
      status:200,
      data:deletedbranch,
      msg:'ok'
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}


export default deleteOneByIdController