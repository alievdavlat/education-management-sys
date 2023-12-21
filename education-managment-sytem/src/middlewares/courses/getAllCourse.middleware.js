import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from '../../utils/getUsers.js'


const getAllCourseMiddleware = async (req, res, next) => {
  try {
      const { verifyId } = req;
      const isAdmin = await getAdmin(verifyId)



      if (isAdmin.role == 'eadmin' || isAdmin.role == 'super_admin' ) {
        next()
        return
      }

      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot access to courses'
      })
      
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default getAllCourseMiddleware