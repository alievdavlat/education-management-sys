import ErrorHandler from "../../utils/errorhandler.js"


const readAdminByIdController  = ( req , res ) => {
  try {
    const { currentAdmin } = req;
    res.status(200).json({
      status:200,
      data:currentAdmin,
      msg:'OK'
    });
  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }
}

export default readAdminByIdController