import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";


const updateOneBranchByIdMiddleware = async ( req , res , next ) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;
    const { address } = req.body;

    const isStaf = await getStafs(verifyId)
    const isAdmin = await getAdmin(verifyId)
  
      if (!address) {
        res.status(204).send({
          status:204,
          data:null,
          msg:'value required'
        })
        return
      }
    
    if (isStaf) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot update branch'
      })
      return
    }
  
    if (isAdmin.role == 'eadmin' || isAdmin.role == 'super_admin' ) {
      req.address = address
      req.branchId = id
      next()
      return
    }
  
  

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}


export default updateOneBranchByIdMiddleware