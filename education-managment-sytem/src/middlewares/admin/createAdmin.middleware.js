import ErrorHandler from "../../utils/errorhandler.js"
import { validateNewAdmin } from "./model.js";
import { getAdmin } from '../../utils/getUsers.js'

const createAdminMiddleware = async( req , res , next ) => {

  try {
    const { verifyId } = req;
    const { username,name, last_name , email, password, dob, gender, phone ,t_account} = req.body;
    const { filename } = req.file;
   
    

    const isSuperAdmin = await getAdmin(verifyId)
 
    if (isSuperAdmin.role != 'super_admin') {
      res.status(401).send({
        status:401,
        data:null,
        msg : 'you cannot create admin '
      })
      return
    }


    if (!username || !name || !last_name || !email || !password || !gender || !dob || !phone  || !t_account  ) {
      res.status(204).send({
        status:204,
        data:null,
        msg : 'values  required'
      })
      return 
    }

    const isAlreadyCreated = await validateNewAdmin(username)


    if (isAlreadyCreated) {
      res.status(400).send({
        status:400,
        data:null,
        msg : 'admin already created'
      })
      return 
    }

    
   


    const data = {username,name, last_name , email, password, dob, gender, phone ,t_account, img:`/img/${filename}`};
    req.data = data
   next()
  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }
}

export default createAdminMiddleware