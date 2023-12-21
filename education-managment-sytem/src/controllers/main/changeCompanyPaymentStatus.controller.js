import ErrorHandler from "../../utils/errorhandler.js";


const changeCompanyPaymentStatusController = async ( req , res ) => {
  try {
      const { changedCompany } = req;


      res.status(200).send({
        status:200,
        data: changedCompany,
        msg:"company payment_status successfuly changed"
      })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  changeCompanyPaymentStatusController