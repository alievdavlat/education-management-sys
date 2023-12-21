import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from '../../utils/getUsers.js'


const getCourseMiddleware = async (req, res, next) => {
  try {
      const { verifyId } = req;
      const { id } = req.params;
      const isAdmin = await getAdmin(verifyId)
      if (isAdmin.role == 'eadmin' || isAdmin.role == 'super_admin' ) {
        req.id = id;
        next()
        return
      }

      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot access to course'
      })
      
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default getCourseMiddleware