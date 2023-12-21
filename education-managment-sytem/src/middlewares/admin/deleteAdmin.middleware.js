import ErrorHandler from "../../utils/errorhandler.js"
import { getAdmin } from "../../utils/getUsers.js";
import removeMedia from "../../utils/removeMedia.js";
import { deleteAdmin } from "./model.js";



const deleteAdminMiddleware = async (req, res, next) => {

try {
  const { verifyId } = req;
  const { id } = req.params;
  const isSuperAdmin = await getAdmin(verifyId)
  const deletedAdmin = await getAdmin(id)


  if ( !id ) {
    res.status(204).send({
      status:204,
      data:null,
      msg : 'id required'
    })
    return
  }
  
  if (isSuperAdmin.role != 'super_admin') {
    res.status(401).send({
      status:401,
      data:null,
      msg : 'you cannot delete admin '
    })
    return
  }

  if (!deletedAdmin || deletedAdmin.id != id) {
    res.status(404).send({
      status:404,
      data:null,
      msg : 'NOT FOUND '
    })
    return
  }
  const deleteEAdmin = await deleteAdmin(id)
  removeMedia(deleteEAdmin.img.slice(5))
  req.deletedAdmin  = deleteEAdmin
  next()

} catch (error) {
  new ErrorHandler(error.message, error.status)
}

}


export default deleteAdminMiddleware