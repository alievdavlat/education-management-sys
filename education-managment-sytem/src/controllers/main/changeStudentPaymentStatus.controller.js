import ErrorHandler from "../../utils/errorhandler.js";


const changeStudentPaymentStatusController = async ( req , res ) => {
  try {
      const { changedStudent } = req;

      res.status(200).send({
        status:200,
        data: changedStudent,
        msg:"student payment_status successfuly changed"
      })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  changeStudentPaymentStatusController