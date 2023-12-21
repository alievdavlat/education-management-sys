import ErrorHandler from '../../utils/errorhandler.js'
import  {getAdmin}  from '../../utils/getUsers.js';



const deleteOneStafByIdMiddleware = async ( req, res, next ) => {
  try {
  const { verifyId } = req;
  const isAdmin = await getAdmin(verifyId);
  const { id } = req.params;

  if (isAdmin.role != "eadmin") {
    res.status(401).send({
      status: 401,
      data: null,
      msg: "you cannot delete stafs ",
    });
    return;
  }

  req.stafId = id;
  next()

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default deleteOneStafByIdMiddleware