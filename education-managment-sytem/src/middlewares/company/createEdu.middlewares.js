import ErrorHandler from "../../utils/errorhandler.js"
import { getAdmin } from "../../utils/getUsers.js";
import { getOneCompany } from "./model.js";


const createEducationMiddleware = async( req , res , next ) => {

  try {

    const { verifyId } = req ;
    const {c_name,  eadmin_id } = req.body
    const { filename } = req.file;
    
    const isSuperAdmin = await getAdmin(verifyId);

    if (isSuperAdmin.role != 'super_admin') {
      
      res.status(401).send({
        status:401,
        data:null,
        msg : 'you cannot create company '
      })
      return
    }


    if (!c_name || !eadmin_id ) {
      res.status(400).send({
        status:400,
        data:null,
        msg : 'company name or admin id is required'
      })
      return 
    }


    const isAlreadyCreated = await getOneCompany(c_name)

    if (isAlreadyCreated) {
      res.status(400).send({
        status:400,
        data:null,
        msg : 'compony already created'
      })
      return 
    }


    const data = { c_name, eadmin_id , logo:`/img/${filename}`}
    req.data = data
   
    next()
  } catch (error) {
    
    new ErrorHandler(error.message, error.status)
  }
}

export default createEducationMiddleware