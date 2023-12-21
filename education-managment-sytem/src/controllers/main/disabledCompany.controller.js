import { blockCompany } from "../../middlewares/main/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const blockCompanyController = async ( req , res ) => {
  try {
      const { id , blocked } = req;
      let msg = 'company successfuly unblocked'
      const blockedCompany = await blockCompany(id ,blocked )

      if (blocked) {
          msg = 'company successfuly blocked'
      }

      res.status(200).send({
        status:200,
        data:blockedCompany,
        msg,
      })
  } catch (err) {
    new ErrorHandler(err.message , err.status)
  }
}

export default  blockCompanyController