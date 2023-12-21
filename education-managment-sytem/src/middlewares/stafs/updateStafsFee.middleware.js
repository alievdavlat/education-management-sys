import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";


const updateStafsFeeMiddleware = async (req, res, next) => { 
  try {
    const { verifyId} = req;
    const { id } = req.params;
    const { fee } = req.body;

    const isAdmin = await getAdmin(verifyId) 
    const staf = await getStafs(id)

    if (isAdmin.role != 'eadmin') {
        res.status(400).send({
          status:400,
          data:null,
          msg:'you cannot update OR set fee'
        })
        return 
    }

    if (!fee ) {
      res.status(204).send({
        status:204,
        data:null,
        msg:'values required'
      })
      return 
    }

    if (!staf) {
      res.status(404).send({
        status:404,
        data:null,
        msg:'not found'
      })
      return 
    }

    req.stafId = id
    req.fee = fee
    next()

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default updateStafsFeeMiddleware
