import { deleteOneCompany } from "../../middlewares/company/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const deleteCompanyController = async( req , res ) => {
  try {
    const { companyId } = req;
    const deletedCompany = await deleteOneCompany(companyId)
    
    res.status(200).send({
      status:200,
      data : deletedCompany,
      msg:'deleted'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}


export default deleteCompanyController