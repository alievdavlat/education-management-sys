import { getAllCourse } from "../../middlewares/courses/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getAllCourseController = async ( req , res ) => {
  try {
    const allCourses = await getAllCourse()



    res.status(200).send({
      status:200,
      data:allCourses,
      msg:'ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default getAllCourseController