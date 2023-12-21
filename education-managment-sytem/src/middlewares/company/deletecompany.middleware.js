import ErrorHandler from "../../utils/errorhandler.js";
import { getDeletedCompany } from "./model.js";
import { getAdmin } from '../../utils/getUsers.js'
import removeMedia from '../../utils/removeMedia.js'


const deleteCompanyMiddleware = async ( req ,res , next ) => {
  try {
      const { verifyId } = req;
      const { id } = req.params;
      const isSuperAdmin = await getAdmin(verifyId)

      if (isSuperAdmin.role != 'super_admin') {
        res.status(401).send({
          status:401,
          data:null,
          msg : 'you cannot delete company '
        })
        return
      }

      const getDeletedCompanies = await getDeletedCompany(id)
      if (!getDeletedCompanies) {
        res.status(404).send({
          status:404,
          data:null,
          msg : 'Not Found'
        })
        return
      } 

      removeMedia(getDeletedCompanies.logo.slice(5))
      req.companyId = id;
      next()
  } catch (err){

    new ErrorHandler(err.message, err.status)

  }
}


export default deleteCompanyMiddleware