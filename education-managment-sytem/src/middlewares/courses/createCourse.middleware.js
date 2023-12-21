import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from '../../utils/getUsers.js'
import { isAlreadyCreated } from "./model.js";


const createCourseMiddleware = async (req, res, next) => {
  try {
      const { verifyId } = req;
      const { filename } = req.file;
      const {course_n, price, company_id} = req.body;

      const isAdmin = await getAdmin(verifyId)
      const isAlreadyCreatedd = await isAlreadyCreated(course_n)
      

      if (!course_n || !price || !company_id) {
        res.status(204).send({
          status:204,
          data:null,
          msg:'values reqired'
        })
        return
      }

      if (isAlreadyCreatedd) {
        res.status(400).send({
          status:400,
          data:null,
          msg:'course already created'
        })
        return
      }

      
      if (isAdmin.role == 'eadmin' || isAdmin.role == 'super_admin' ) {
        const data = {course_n, price,company_id, img:`/img/${filename}`}
        req.data = data
        next()
        return
      }

      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot create course'
      })
      
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default createCourseMiddleware