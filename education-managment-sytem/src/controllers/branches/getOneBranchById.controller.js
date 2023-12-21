import { getOneBranchById } from "../../middlewares/branches/model.js";
import ErrorHandler from "../../utils/errorhandler.js";

const getOneBrancheByIdController = async ( req , res ) => {
  try {
    const { branchId } = req;
    const oneBranch = await getOneBranchById(branchId)


    res.status(200).send({
      status:200,
      data:oneBranch,
      msg:'Ok'
    })
    
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default getOneBrancheByIdController