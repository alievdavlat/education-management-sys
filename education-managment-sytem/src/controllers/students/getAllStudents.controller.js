import ErrorHandler from "../../utils/errorhandler.js";


const getAllStudentsController = ( req , res ) => {
  try {
    const { allstudents } = req
    res.status(200).send({
      status:200,
      data:allstudents,
      msg:'ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  getAllStudentsController