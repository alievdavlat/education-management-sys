import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const updateGroupsMiddleware = async ( req , res, next ) => {
  try {

    const { verifyId } = req;

    const { id } = req.params;

    const { g_name , group_n, room, days, time, teacher_id, assistant_id, sesioon } = req.body;

    const isAdmin = await getAdmin(verifyId)


    if ( !g_name , !group_n, !room, !days, !time, !teacher_id, !assistant_id, !sesioon ) {
      res.status(204).send({
        status:204,
        data:null,
        msg:'values required'
      })
      return
    }

    if (!isAdmin) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot create group'
      })
      return
  }

  const data = {id,  g_name , group_n, room, days, time, teacher_id, assistant_id, sesioon }

  req.data = data
  next()

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  updateGroupsMiddleware