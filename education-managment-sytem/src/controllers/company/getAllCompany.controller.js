import { getAllCompany } from "../../middlewares/company/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getAllCompanyCOntroller = async ( req , res ) => {
  try {

    const allCompany = await getAllCompany()
     
    res.status(200).send({
      status:200,
      data:allCompany,
      msg:'Ok'
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}


export default getAllCompanyCOntroller