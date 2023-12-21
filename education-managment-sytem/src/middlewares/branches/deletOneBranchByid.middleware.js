import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";


const deleteOneByIdMiddleware = async (req, res, next) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;
    const isAdmin = await getAdmin(verifyId)
    const isStaf = await getStafs(verifyId)
  
    if (isStaf) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot delete'
      })
      return
    }

    if (isAdmin.role != 'eadmin') {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot acces'
      })
      return
    }

    req.branchId = id;
    next()

  } catch (err) {
    new ErrorHandler(err.message,err.status)
  }
}

export default deleteOneByIdMiddleware