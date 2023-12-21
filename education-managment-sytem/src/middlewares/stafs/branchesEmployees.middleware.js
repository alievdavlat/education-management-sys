import ErrorHandler from '../../utils/errorhandler.js'
import { getAdmin } from '../../utils/getUsers.js'

const branchesEmployeesMiddleware = async ( req , res , next ) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;
    const { column , offset , limit } = req.body;
    const isAdmin = await getAdmin(verifyId)

    if (isAdmin.role == 'eadmin' || isAdmin.role == 'super_admin') {
      req.column = column 
      req.offset = offset
      req.limit = limit
      req.branchId = id
      next()
      return
    }

    res.status(400).send({
      status:400,
      data:null,
      msg:'you cannot access '
    })


  } catch (err) {
    new ErrorHandler(err.message , err.status)
  }
}

export default branchesEmployeesMiddleware