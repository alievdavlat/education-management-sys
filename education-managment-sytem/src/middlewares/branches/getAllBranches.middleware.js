import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";
import { getAllBranchesForEadmin, getAllBranchesForSuperAdmin } from "./model.js";


const getAllBranchesMiddleware = async ( req, res , next ) => {
try {


  const { verifyId } = req ;
  const { column , offset , limit } = req.body;
  const isStaf = await getStafs(verifyId)
  const isAdmin = await getAdmin(verifyId)
  if (isStaf) {
    res.status(400).send({
      status:400,
      data:null,
      msg:'you cannot acces'
    })
    return
  }

  if (isAdmin.role == 'super_admin' ) {
    const allBranches = await getAllBranchesForSuperAdmin(column , offset , limit )
    req.allBranches = allBranches
    next()
    return
  }

  if (isAdmin.role == 'eadmin' ) {
    const allBranches = await getAllBranchesForEadmin(verifyId,column , offset , limit )
    req.allBranches = allBranches
    next()
    return
  }

  res.status(400).send({
    status:400,
    data:null,
    msg:'you cannot acces'
  })
  

} catch (err) {
  new ErrorHandler(err.message , err.status)
}
}


export default getAllBranchesMiddleware