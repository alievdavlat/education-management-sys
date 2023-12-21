import { deleteGrups } from "../../middlewares/groups/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const deleteGroupsController = async ( req , res ) => {
  try {
    const { id } = req;
    const deletedGroup = await deleteGrups(id)

    res.status(200).send({
      status:200,
      data:deletedGroup,
      msg:"ok"
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default deleteGroupsController