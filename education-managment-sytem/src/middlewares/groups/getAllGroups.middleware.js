import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";
import {  getAllGroupForEadmin, getAllGroupForSadmin } from "./model.js";


const getAllGroupsMiddleware = async(req, res, next) => {
  try {

    const { verifyId } = req;
    const { column , offset , limit } = req.body;
    const isAdmin = await getAdmin(verifyId)

    

    if (isAdmin.role = 'eadmin') {
      const allGroups = await getAllGroupForEadmin(verifyId, column, offset ,limit)
      req.allGroups = allGroups
      next()
      return
  }

  
  if (isAdmin.role = 'super_admin') {
    const allGroups = await getAllGroupForSadmin( column, offset ,limit)
    req.allGroups = allGroups
    next()
    return
}


  
  res.status(400).send({
    status:400,
    data:null,
    msg:'you cannot create group'
  })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default getAllGroupsMiddleware