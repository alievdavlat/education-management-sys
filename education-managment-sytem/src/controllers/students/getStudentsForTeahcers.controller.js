import ErrorHandler from "../../utils/errorhandler.js";

const getAllStudentsForTeachersController = (req , res ) => {
  try {
    const {} = req;

    const { allstudents } = req
    res.status(200).send({
      status:200,
      data:allstudents,
      msg:'ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default  getAllStudentsForTeachersController