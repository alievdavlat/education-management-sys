
import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const getAllCompanyMiddleware = async( req , res  ,next ) => {
  try {
      const {verifyId } = req;
      const isSuperAdmin = await getAdmin(verifyId)
      if (isSuperAdmin.role != 'super_admin') {
        res.status(400).send({
          status:400,
          data:null,
          msg:'you cannot acces'
        })
        return
      }


     
      next()

    } catch (err) {
        new ErrorHandler(err.message, err.status)
     }
  }


  export default getAllCompanyMiddleware