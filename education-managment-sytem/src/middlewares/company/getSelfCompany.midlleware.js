import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from '../../utils/getUsers.js'
import { getSelfCompanyForAdmin, getSelfCompanyForStafs } from "./model.js";

const getSelfCompanyMiddleware = async (req, res, next) => {
  try {
    const { verifyId } = req;


    const isAdmin  = await getAdmin(verifyId)
    
    if (isAdmin) {
      const company = await getSelfCompanyForAdmin(verifyId);
      req.company = company
      next()
      return
    }
    
    const isStaf = await getStafs(verifyId)
  

    if(isStaf) {
      
        const company = await getSelfCompanyForStafs(verifyId);
        req.company = company
        next()
        return
      }
    
  
    res.status(404).send({
      status:404,
      data:null,
      msg :'not found'
    })

  } catch (err) {
      new ErrorHandler(err.message, err.status)
  }
}


export default getSelfCompanyMiddleware