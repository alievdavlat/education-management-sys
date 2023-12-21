import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin } from "../../utils/getUsers.js";


const updateCourseMiddleware = async ( req, res , next ) => {
  try {
      const { verifyId } = req;
      const { id } = req.params;
      const { price} = req.body;
      const isAdmin = await getAdmin(verifyId)

      if (!price) {
        res.status(204).send({
          status:204,
          data:null,
          msg:'values reqired'
        })
        return
      }

      if (isAdmin.role == 'eadmin') {
        req.price = price;
        req.id = id;
        next()
        return
      }

      res.status(400).send({
        status:400,
        data:null,
        msg:'you cannot update course'
      })
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default  updateCourseMiddleware