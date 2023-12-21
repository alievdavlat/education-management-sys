import ErrorHandler from "../../utils/errorhandler.js";


const getOneHomeworkMiddleware = (req, res, next) => {
  try {
    const { id } = req.params;


    if (!id) {
      res.status(204).send({
        status:204,
        data:null,
        msg:'values required'
      })
      return
    }


    req.id = id
    next()

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default getOneHomeworkMiddleware