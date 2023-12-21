import ErrorHandler from "../../utils/errorhandler.js";
import { createNewBranch } from "../../middlewares/branches/model.js";


const createBranchContrller  = async ( req , res ) => {
  try {
  const { address  ,company_id} = req;    
 
  const newBranch = await createNewBranch(address,  company_id)

  res.status(201).send({
    status:201,
    data:newBranch,
    msg:'created new branch'
  })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default createBranchContrller