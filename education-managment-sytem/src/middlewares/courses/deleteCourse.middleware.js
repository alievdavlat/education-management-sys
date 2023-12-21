import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";

const deleteCourseMiddleware = async ( req , res , next ) => {
try {
  const { verifyId } = req;
  const isAdmin = await getAdmin(verifyId)
  const { id } = req.params;
  if (isAdmin.role == 'eadmin') {
    req.id = id
    next()
    return
  }

  res.status(400).send({
    status:400,
    data:null,
    msg:'you cannot delete course'
  })



} catch (err) {
    new ErrorHandler(err.message, err.status)
}
}

export default  deleteCourseMiddleware