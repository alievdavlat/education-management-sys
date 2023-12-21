import ErrorHandler from "../../utils/errorhandler.js"


const deleteAdminController = ( req , res ) => {
try {
  const { deletedAdmin } = req;
  
  res.status( 202 ).send({
    status:202,
    data: {...deletedAdmin},
    msg:'deleted' 
  });
} catch (error) {
  new ErrorHandler(error.message, error.status)
}

}

export default  deleteAdminController