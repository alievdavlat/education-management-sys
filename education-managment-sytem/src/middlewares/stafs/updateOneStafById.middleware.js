import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";


const updateOneStafByIdMiddleware = async( req , res , next ) => {
  try {
    const { verifyId } = req;
    const { id } = req.params;
    const { username , email, password , phone } = req.body;
    
    const isAdmin = await getAdmin(verifyId);
    const isStaf = await getStafs(verifyId)

  if (!username || !email || !password || !phone ) {
    res.status(204).send({
      status: 204,
      data: null,
      msg: "values required",
    });
    return
  }

if (isAdmin.role == 'eadmin') {
    const data = {id,username , email, password , phone }
    req.data = data
    next()
    return
  }

  if (isStaf && isStaf.id == id) {
    const data = {id, username , email, password , phone }
    req.data = data
    next()
    return
  }

    res.status(401).send({
      status: 401,
      data: null,
      msg: "you cannot update",
    });

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default updateOneStafByIdMiddleware