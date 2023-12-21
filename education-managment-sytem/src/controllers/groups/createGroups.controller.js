import { createGroup } from "../../middlewares/groups/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const createGroupController = async (req, res) => {
  try {
    const { data } = req;

    const createdgroup =  await createGroup(
      data.g_name, data.group_n, data.room, data.days, 
      data.time, data.teacher_id, data.assistant_id,
      data.branch_id, data.company_id, data.sesioon
    );

    res.status(200).send({
      status:200,
      data:createdgroup,
      msg:"ok"
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default createGroupController