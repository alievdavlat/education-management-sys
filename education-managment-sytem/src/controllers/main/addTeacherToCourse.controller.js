import ErrorHandler from "../../utils/errorhandler.js"


const addteacherToCourseController =  async( req , res ) => {
try {
  const { staf } = req
  
  res.status(200).send({
    status:200,
    data: staf,
    msg:" successfuly added teacher to course"
  })
  
} catch (error) {
    new ErrorHandler(error.message, error.status)
}}

export default addteacherToCourseController