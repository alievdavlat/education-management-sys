import ErrorHandler from '../../utils/errorhandler.js'
import { getStafs } from '../../utils/getUsers.js'

const createHomeworksMiddleware = async ( req , res , next ) => {
  try {
        const { verifyId } = req;
        const { title, body, company_id } = req.body;
        const { id } = req.params;
        const isTeacher = await getStafs(verifyId)

        if (!title || !body  || !company_id) {
          res.status(204).send({
            status:204,
            data:null,
            msg:'values required'
          })
          return
        }

        if (isTeacher.role == 'main-teacher' || isTeacher.role == 'assistant' ) {
            const data = { title, body, id, company_id }
            req.data = data
            next()
            return
        }

        res.status(400).send({
          status:400,
          data:null,
          msg:'Homework can only be given by the teacher or assistant teacher'
        })
        

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  createHomeworksMiddleware