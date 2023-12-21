import { addStudentToGroup } from "../../middlewares/main/model.js";
import ErrorHandler from "../../utils/errorhandler.js";

const addStudentToGroupController  = async (req, res) => {
  try {
    const { group_id , student_id } = req; 

    const addedStudent = await addStudentToGroup(group_id , student_id)

    res.status(200).send({
      status:200,
      data: addedStudent,
      msg:"successfuly added student  to group"
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  addStudentToGroupController