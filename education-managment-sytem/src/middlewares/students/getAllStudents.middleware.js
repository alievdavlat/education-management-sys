import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";
import {  getAllStudentsForEAdmin, getAllStudentsForSAdmin } from "./model.js";


const getAllStudentsMiddleware = async ( req , res , next ) => {
  try {
      const { verifyId } = req;
      const {branchId, column , offset, limit } = req.body;
      const isAdmin  = await getAdmin(verifyId)

        if (isAdmin.role == 'super_admin') {
            const allstudents = await getAllStudentsForSAdmin(branchId, column, offset, limit)
            req.allstudents = allstudents
            next()
            return
          }



        if (isAdmin.role == 'eadmin') {
            const allstudents = await getAllStudentsForEAdmin(verifyId,column , offset, limit)
            req.allstudents = allstudents
            next()
            return
          }    



      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot acces'
      })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default  getAllStudentsMiddleware