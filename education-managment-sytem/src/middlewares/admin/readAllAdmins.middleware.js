import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";
import {  readAllAdmins } from "./model.js";


const readAllAdminsMiddleware  = async( req , res , next ) => {
  try {
    const { verifyId } = req;
    const isSuperAdmin = await getAdmin(verifyId)
    
    if (isSuperAdmin.role != 'super_admin') {
      res.status(401).send({
        status:401,
        data:null,
        msg : 'you cannot read admins '
      })
      return
    }
    
    const allAdmins = await readAllAdmins()

    req.allAdmins = allAdmins;
    next()
  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }
}


export default readAllAdminsMiddleware