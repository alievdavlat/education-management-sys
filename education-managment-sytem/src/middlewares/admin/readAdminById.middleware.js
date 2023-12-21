import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";
import {  readAdminById } from "./model.js";


const readAdminByIdMiddleware = async ( req , res , next ) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;

    const isSuperAdmin = await getAdmin(verifyId)

    if (isSuperAdmin.role != 'super_admin') {
      res.status(401).send({
        status:401,
        data:null,
        msg : 'you cannot read admins '
      })
      return
    }

    const currentAdmin = await readAdminById(id)
    req.currentAdmin = currentAdmin
    next()

  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }
}


export default readAdminByIdMiddleware