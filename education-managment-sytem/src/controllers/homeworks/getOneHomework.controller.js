import { getOneHomework } from "../../middlewares/homeworks/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getOneHomeworkCOntroller = async ( req , res ) => {
  try {
    const { id } = req;
    const currentHomework = await getOneHomework(id)

    res.status(200).send({
      status:200,
      data:currentHomework,
      msg:'ok'
    })
    
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  getOneHomeworkCOntroller