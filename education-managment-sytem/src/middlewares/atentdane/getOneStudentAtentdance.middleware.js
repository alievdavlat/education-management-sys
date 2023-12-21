import ErrorHandler from "../../utils/errorhandler.js";


const getOneStudentsAtentdanceMiddleware = ( req , res, next ) => {
try {
  const { id } = req.params 
  if (!id) {
    res.status(400).send({
      status:400,
      data:null,
      msg:'student id required '
    })
    return
  }

  req.id = id
  next()
} catch (err) {
  new ErrorHandler(err.message, err.status)
}}

export default getOneStudentsAtentdanceMiddleware

