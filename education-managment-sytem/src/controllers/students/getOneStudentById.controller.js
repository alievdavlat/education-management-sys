import ErrorHandler from "../../utils/errorhandler.js";



const getOneStudentByIdController = (req , res) => {

  try {
        const { student } = req;
        res.status(200).send({
          status:200,
          data:student,
          msg:'Ok'
        })


  } catch (err) {
      new ErrorHandler(err.message, err.status)
  }
}


export default  getOneStudentByIdController