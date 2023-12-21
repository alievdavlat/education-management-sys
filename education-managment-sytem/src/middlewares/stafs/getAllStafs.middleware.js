import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";
import { getAllStafsForEadmin, getAllStafsForSuperAdmin } from "./model.js";


const getAllStafsMiddleware = async (req, res, next) => {
  try {
    const { verifyId } = req;
    const {branchId, column , offset, limit} = req.body;

    const isAdmin = await getAdmin(verifyId)
    const isStaf = await getStafs(verifyId);


    if (isStaf) {
      res.status(401).send({
        status: 401,
        data: null,
        msg: "you cannot  acccess ",
      });
      return;
    }
  
    if (isAdmin.role == 'super_admin') {
      const allStafs = await getAllStafsForSuperAdmin(branchId, column, offset, limit)
      req.allStafs =  allStafs
      next()
      return
    }

    if (isAdmin.role == 'eadmin') {
    const allStafs = await getAllStafsForEadmin(verifyId, column, offset, limit)
    req.allStafs = allStafs
    next()
      return
    }

    res.status(401).send({
      status: 401,
      data: null,
      msg: "you cannot acccess ",
    });
    
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default getAllStafsMiddleware
