import { deleteHomework } from "../../middlewares/homeworks/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const deleteHomeWorkController = async ( req , res ) => {
  try {
    const { id } = req;

    const deletedHomework = await deleteHomework(id)


    res.status(400).send({
      status:400,
      data:deletedHomework,
      msg:'Homework successfuly deleted'
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default deleteHomeWorkController