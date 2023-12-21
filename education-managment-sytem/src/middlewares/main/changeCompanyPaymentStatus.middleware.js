import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";
import { changeCompnyPaymentStatus, changeCompnyPaymentStatus2 } from "./model.js";


const changeCompanyPaymentStatusMiddleware = async ( req, res, next ) => {
  try {
      const { verifyId } = req;
      const { id } = req.params;
      const { payment_status } = req.body;
      const isAdmin = await getAdmin(verifyId)

      if (payment_status === undefined) {
        res.status(204),send({
          status:204,
          data:null,
          msg:'values required'
        })
        return
      }

      if (isAdmin.role  != 'super_admin') {
          res.status(400),send({
            status:400,
            data:null,
            msg:'Only the  crm  admin can change company payment statuses.'
          })
          return
      }
      
      if (payment_status) {
          const date = new Date()
          const DATE = `${date.getDate()}.${date.getMonth() < 10 ? '0' + (date.getMonth() + 1 ): date.getMonth() }.${date.getFullYear()}`
          const changedCompany = await changeCompnyPaymentStatus2(id, payment_status,DATE )
          req.changedCompany = changedCompany
          next()
          return
        } 
        
        
        if (!payment_status) {
          const changedCompany = await changeCompnyPaymentStatus(id, payment_status)
          req.changedCompany = changedCompany
          next()
          return
        }
      
    

  } catch (err) {
    new ErrorHandler(err.message , err.status)
  }
}

export default  changeCompanyPaymentStatusMiddleware