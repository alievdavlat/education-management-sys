import { updateCourse } from "../../middlewares/courses/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const updateCourseController = async ( req , res ) => {
  try {
    const { id, price } = req;
    const updatedCourse = await updateCourse(id,price)
    res.status(200).send({
      status:200,
      data:updatedCourse,
      msg:'ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default updateCourseController