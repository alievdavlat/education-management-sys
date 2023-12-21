import { updateOneBYid } from "../../middlewares/branches/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const updateOnebranchByIdController = async ( req , res ) => {
  try {
    const { branchId , address} = req;

    const updatedBranch  = await updateOneBYid(address, branchId)

    res.status(200).send({
      status:200,
      data:updatedBranch,
      msg:'updated'      
    })
  } catch (err ){
    
    new ErrorHandler(err.message, err.status)

  }
}


export default updateOnebranchByIdController
