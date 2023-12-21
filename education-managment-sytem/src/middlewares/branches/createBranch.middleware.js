import ErrorHandler from '../../utils/errorhandler.js'
import { getAdmin, getStafs } from '../../utils/getUsers.js'
import { getOneBranch } from './model.js';

const createBranchMiddleware = async (req, res, next) => {
  try {
    const { verifyId } = req ;
   
    const {address, company_id} = req.body;


    const isAdmin = await getAdmin(verifyId)
    const isStaf = await getStafs(verifyId)
  
    if (isStaf) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot delete'
      })
      return
    }


    if (isAdmin.role != 'eadmin') {
        res.status(400).send({
          status:400,
          data:null,
          msg:'you cannot create branch'
        })
        return
      }


      if (!address || !company_id) {
        res.status(204).send({
          status:204,
          data:null,
          msg:'values required'
        })
        return
      }

      const isAlredyCreated = await getOneBranch(address)
       
      if (isAlredyCreated) {
        res.status(400).send({
          status:400,
          data:null,
          msg:'branch already created'
        })

        return
      }

      req.address = address
      req.company_id = company_id

      next()
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default createBranchMiddleware