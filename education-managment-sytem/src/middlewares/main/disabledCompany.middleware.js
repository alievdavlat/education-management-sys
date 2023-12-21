import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const blockCompnyMiddleware = async ( req ,res , next ) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;
    const { blocked } = req.body;
    const isAdmin =  await getAdmin(verifyId)


    if (isAdmin.role  != 'super_admin') {
      res.status(400).send({
        status:400,
        data: null,
        msg:'Only super admin can block companies.'
      })  
      return
    }


    req.id = id 
    req.blocked = blocked
    next()
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default blockCompnyMiddleware