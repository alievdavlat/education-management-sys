import { createHomeworks } from "../../middlewares/homeworks/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const createHomeworksController = async ( req , res ) => {
  try {
      const { data } = req;
      const createdHomework = await createHomeworks(
        data.title, data.body, data.id, data.company_id
      )


      res.status(200).send({
        status:200,
        data:createdHomework,
        msg:'homework successfuly added'
      })
      
  } catch (err) {
     new ErrorHandler(err.message, err.status);
  }
}

export default  createHomeworksController