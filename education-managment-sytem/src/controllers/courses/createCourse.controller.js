import { createCourse } from "../../middlewares/courses/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const createCourseController = async ( req , res ) => {
  try {
    const { data } = req;
    const createdCourse = await createCourse(data.course_n, data.price,data.company_id, data.img)
    res.status(200).send({
      status:200,
      data:createdCourse,
      msg:'ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default createCourseController