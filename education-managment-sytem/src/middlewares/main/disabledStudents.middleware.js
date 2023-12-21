import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const disabledStudntsMiddleware  = async ( req, res , next ) => {
  try {
    const { verifyId } = req;
    const isAdmin = await getAdmin(verifyId)
    const { blocked } = req.body;
    const { id } = req.params;

    if (isAdmin.role  != 'eadmin') {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot manage students'
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

export default  disabledStudntsMiddleware