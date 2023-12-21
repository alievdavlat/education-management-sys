import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const updateStudentMiddleware = async( req , res , next ) => {
  try {
    const { verifyId } = req; 
    const { id } = req.params;
    const { username , branch_id} = req.body;
    const isAdmin  = await getAdmin(verifyId)

    if (isAdmin.role != 'eadmin') {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot update '
      })
      return
    }

    req.id = id
    req.username = username
    req.branch_id = branch_id
    next()
  } catch (err) {
    new ErrorHandler(err.message . err.status)
  }
}

export default  updateStudentMiddleware