import ErrorHandler from "../../utils/errorhandler.js";


const getAllHomeworkAtGroupMiddleware = async ( req, res, next ) => {
  try {
      const { id } = req.params;
      
      
        req.groupId = id;
        next()
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default getAllHomeworkAtGroupMiddleware

