import { getOneCompanyById } from "../../middlewares/company/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getOneCOmpanyByIdController  = async( req , res ) => {
  try {
    const { companyId } = req;


    const companyById = await getOneCompanyById(companyId)
    res.status(200).send({
      status:200,
      data:companyById,
      msg:'OK'
    })

  } catch (err) {
    
  }

}

export default getOneCOmpanyByIdController