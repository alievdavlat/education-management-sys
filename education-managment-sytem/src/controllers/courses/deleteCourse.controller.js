import { deleteCourse } from "../../middlewares/courses/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const deleteCourseController = async ( req , res ) => {
  try {
    const { id } = req;
    const deletedCourse = await deleteCourse(id)

    res.status(200).send({
      status:200,
      data:deletedCourse,
      msg:'ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default deleteCourseController