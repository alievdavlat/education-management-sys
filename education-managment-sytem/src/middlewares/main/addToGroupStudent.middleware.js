import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";
import { studentAlreadyAddedGroup } from "./model.js";


const addStudentToGroupMiddleware = async (req, res, next) => {
  try {
      const { verifyId } = req;
    
      const { group_id , student_id } = req.body;
    
      const isAdmin  =  await getAdmin(verifyId)

      if (!group_id || !student_id) {
        res.status(204).send({
          status:204,
          data:null,
          msg:'values required'
        })
        return
      } 

      const isAlreadyAdded = await studentAlreadyAddedGroup(group_id , student_id)
      if (isAlreadyAdded) {
        res.status(400).send({
          status:400,
          data:null,
          msg:'student already added to group'
        })
        return
      }

      if (isAdmin.role !== "eadmin") {
        res.status(400).send({
          status:400,
          data:null,
          msg:'you cannot add teacher to course'
        })
        return
      } 



      req.group_id = group_id
      req.student_id = student_id
      next()
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default  addStudentToGroupMiddleware