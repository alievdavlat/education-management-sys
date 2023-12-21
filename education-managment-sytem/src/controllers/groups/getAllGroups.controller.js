import ErrorHandler from "../../utils/errorhandler.js";

const getAllGroupsController = ( req, res ) => {
  try {
    const { allGroups } = req;

    res.status(200).send({
      status:200,
      data:allGroups,
      msg:"ok"
    })
  } catch (err) {
    new ErrorHandler(err.message , err.status)
  }
}


export default  getAllGroupsController