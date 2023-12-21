import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from '../../utils/getUsers.js'

const updateCompanyMiddleware = async ( req , res , next ) => {

  try {
    const { verifyId } = req ;
    const { c_name } = req.body;
    const { id } = req.params;


    const isAdmin = await getAdmin(verifyId)

    if (isAdmin.role != 'super_admin' ) {
        res.status(400).send({
          status:400,
          data:null,
          msg: 'you can not update companies'
        })
        return
    }

    if (c_name.length === 0) {
      res.status(204).send({
        status:204,
        data:null,
        msg: 'value is required'
      })
      return  
    }

    req.c_name = c_name
    req.companyId = id
    next()
  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }

}

export default updateCompanyMiddleware