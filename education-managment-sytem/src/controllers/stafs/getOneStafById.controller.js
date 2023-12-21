import ErrorHandler from "../../utils/errorhandler.js";

const getOneStafByIdController  = ( req , res ) => {
try {
const { foundedStaf } = req;

res.status(200).send({
  status:200,
  data:foundedStaf,
  msg:'ok'
})

} catch (err) {
  new ErrorHandler(err.message, err.status)
}
}


export default getOneStafByIdController
