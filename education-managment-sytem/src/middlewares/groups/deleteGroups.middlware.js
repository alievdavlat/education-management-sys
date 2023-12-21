import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const deleteGroupsMiddlware = async ( req , res, next ) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;
    const isAdmin  = await getAdmin(verifyId)

    if (!isAdmin) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot create group'
      })
      return
    }

    req.id = id
    next()
  } catch (err) {
    new ErrorHandler(err)
  }
}

export default  deleteGroupsMiddlware