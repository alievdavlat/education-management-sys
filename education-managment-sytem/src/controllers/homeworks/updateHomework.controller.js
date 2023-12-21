import {  updateHomework } from "../../middlewares/homeworks/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const updateHomeworksController = async ( req , res ) => {
  try {
      const { data } = req;
      const updatedHomework = await updateHomework(
        data.id, data.title, data.body
      )


      res.status(200).send({
        status:200,
        data:updatedHomework,
        msg:'homework successfuly updated'
      })
      
  } catch (err) {
     new ErrorHandler(err.message, err.status);
  }
}

export default  updateHomeworksController