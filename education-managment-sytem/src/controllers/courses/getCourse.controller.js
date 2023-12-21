import { getCourse } from "../../middlewares/courses/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getCourseController = async ( req , res ) => {
  try {
    const { id } = req;
    const currentCourse = await getCourse(id)
    res.status(200).send({
      status:200,
      data:currentCourse,
      msg:'ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default getCourseController