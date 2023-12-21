import ErrorHandler from "../../utils/errorhandler.js";

const readAllAdminsController = ( req , res ) => {
  try {
    const { allAdmins } = req;
    res.status(200).json({
      status:200,
      data:allAdmins,
      msg:'OK'
    })


  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }
}


export default readAllAdminsController
