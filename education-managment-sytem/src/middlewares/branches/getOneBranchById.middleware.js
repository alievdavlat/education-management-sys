import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";


const getOneBranchByIdMiddleware = async ( req , res , next ) => {
try {
  const { verifyId } = req;
  const { id } = req.params;

  const isAdmin = await getAdmin(verifyId)
  const isStaf = await getStafs(verifyId)

  if (isStaf) {
    res.status(400).send({
      status:400,
      data:null,
      msg:'you cannot acces'
    })
    return
  }

  if (isAdmin.role == 'eadmin' || isAdmin.role == 'super_admin') {
    req.branchId = id;
    next()
    return
  }

  res.status(400).send({
    status:400,
    data:null,
    msg:'you cannot access'
  })

} catch (err) {
  new ErrorHandler(err.message, err.status)
}
}


export default getOneBranchByIdMiddleware
