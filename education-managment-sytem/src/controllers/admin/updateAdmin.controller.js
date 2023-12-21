import { updateOneAdminById } from "../../middlewares/admin/model.js";
import ErrorHandler from "../../utils/errorhandler.js";
import hashPassword from "../../utils/hashing.js";


const updateAdminController = async( req , res ) => {
try {

  let hashedPassword = ''

  const { adminId,newBody } = req;

  hashedPassword  = await hashPassword(newBody.password);
  newBody.password = hashedPassword;
  
  const updatedAdmin = await updateOneAdminById(
    adminId,
    newBody.username,
    newBody.name, 
    newBody.last_name, 
    newBody.email, 
    newBody.password, 
    newBody.phone, 
    newBody.t_account
    );
  res.status(200).json({
    status:200,
    data:updatedAdmin,
    msg:'UPDATED'
  })

} catch (err) {
  new ErrorHandler(err.message, err.status)
}
}


export default updateAdminController