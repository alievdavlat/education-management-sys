import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const deleteStudentMiddleware = async ( req , res, next ) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;
    const isAdmin = await getAdmin(verifyId)

    if (isAdmin.role != 'eadmin') {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot delete '
      })
      return
    }

    req.id = id
    next()   
     
  } catch (err) {
    new ErrorHandler( err.message , err.status)
  }
}

export default deleteStudentMiddleware