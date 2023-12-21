import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const getOneCompanyByIdMiddleware = async ( req , res , next ) => {
  try {

    const {verifyId } = req;
    const { id } = req.params;
    const isSuperAdmin = await getAdmin(verifyId)

    

    if (isSuperAdmin.role != 'super_admin') {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot acces'
      })
      return
    }

    req.companyId = id;
    next()

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default getOneCompanyByIdMiddleware