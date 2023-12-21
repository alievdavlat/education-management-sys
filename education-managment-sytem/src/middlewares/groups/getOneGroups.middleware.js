import ErrorHandler from '../../utils/errorhandler.js'
import { getAdmin, getStafs } from '../../utils/getUsers.js'

const getOneGroupMiddleware = async ( req, res , next ) => {
  try {


    const { id } = req.params;
    
    if (!id) {
      res.status(204).send({
        status:204,
        data:null,
        msg:'id nont found'
      })
      return
    }


    req.id = id
    next()
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  getOneGroupMiddleware