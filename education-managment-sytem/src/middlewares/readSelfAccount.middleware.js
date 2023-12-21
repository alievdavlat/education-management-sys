import ErrorHandler from "../utils/errorhandler.js";
import { readAdminById } from "./admin/model.js";
import { getAdmin, getStafs } from '../utils/getUsers.js'

const readSelfAccountMiddleware = async ( req , res , next ) => {
  try {
    
    const { verifyId } = req;
    const isAdmin = await getAdmin(verifyId)
    const isStaf = await getStafs(verifyId)

    
    if (isStaf) {
      req.account = isStaf
      next() 
      return
    }

  if (isAdmin.role == 'super_admin') {
      req.account = isAdmin
      next()
      return
    }  

    if (isAdmin.role == 'eadmin') {
    const account = await readAdminById(verifyId)
    req.account = account
    next()
    return
    }




  } catch (err) {
      new ErrorHandler(err.message, err.status);
  }
}


export default readSelfAccountMiddleware