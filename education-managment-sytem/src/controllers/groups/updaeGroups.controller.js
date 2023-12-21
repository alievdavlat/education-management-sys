import { updateGroup } from "../../middlewares/groups/model.js";
import ErrorHandler from "../../utils/errorhandler.js";

const updateGroupsController  = async ( req  , res ) => {
  try {
    const { data } = req;

    const updatedGroup = await updateGroup(
      data.id ,
      data.g_name,data.group_n,
      data.room, data.days,
      data.time, data.teacher_id, 
      data.assistant_id, data.sesioon
    );

    res.status(200).send({
      status:200,
      data:updatedGroup,
      msg:"ok"
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status) 
  }

}

export default  updateGroupsController