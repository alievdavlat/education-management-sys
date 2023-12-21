import { createHomeworks, getAllHomeworkAtGroup } from "../../middlewares/homeworks/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getAllHomeworkAtGroupController = async ( req , res ) => {
  try {
      const { groupId } = req;
      const allHomeWorksAtGroup = await getAllHomeworkAtGroup(groupId)


      res.status(200).send({
        status:200,
        data:allHomeWorksAtGroup,
        msg:'homework successfuly added'
      })
      
  } catch (err) {
     new ErrorHandler(err.message, err.status);
  }
}

export default  getAllHomeworkAtGroupController