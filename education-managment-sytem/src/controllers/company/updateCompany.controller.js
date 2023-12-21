import { updateOneCompany } from "../../middlewares/company/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const updateCompanyController = async ( req ,res ) => {
  try {
    const { c_name , companyId} = req;

    const updatedCompany = await updateOneCompany(companyId, c_name)

    res.status(200).send({
      status:200,
      data:updatedCompany,
      msg:'updated'
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default updateCompanyController
