import { createCompany } from "../../middlewares/company/model.js"
import ErrorHandler from "../../utils/errorhandler.js"


const createEducationController =  async( req , res ) => {
try {
  const { data } = req

  const newCompany = await createCompany(data.c_name,  data.logo, data.eadmin_id)
 
  res.status(201).send({
    status:201,
    data:newCompany,
    msg:"created"
  })
  
} catch (error) {
  
    new ErrorHandler(error.message, error.status)
}

}

export default createEducationController