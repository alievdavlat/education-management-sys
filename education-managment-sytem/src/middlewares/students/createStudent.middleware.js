import ErrorHandler from '../../utils/errorhandler.js'
import { getAdmin } from '../../utils/getUsers.js'
import { isAlreadyCreated } from './model.js';

const createStudentmiddleware = async ( req , res , next ) => {
  try {
    const { verifyId } = req;
    const { 
      username,
      name , 
      last_name, 
      gender,
      dob, 
      branch_id,
      company_id
    } = req.body;
    const isAdmin  = await getAdmin(verifyId);
    const isAlready = await isAlreadyCreated(username)

    

    if (!username || !name || !last_name || !gender || !dob  || !branch_id || !company_id) {
      res.status(204).send({
        status:204,
        data:null,
        msg:'values required'
      })
      return
    }

    if (isAlready) {
      res.status(400).send({
        status:400,
        data:null,
        msg:'student already created'
      })
      return
    }

    if (isAdmin.role != 'eadmin') {
      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot create students'
      })
      return
      }

    const data = { 
      username,
      name , 
      last_name, 
      gender,
      dob, 
      branch_id,
      company_id
    }

    req.data = data
    next()

  } catch (err) {
    new ErrorHandler(err.message , err.status)
  }
}

export default createStudentmiddleware