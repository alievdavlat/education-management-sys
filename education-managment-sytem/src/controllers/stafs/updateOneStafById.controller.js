import { updateOneStafById } from "../../middlewares/stafs/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const updateOneStafByIdController = async( req , res ) => {
  try {
    const { data } = req;
   
   
    const  updatedStaf  =  await updateOneStafById(
          data.id,
          data.username,
          data.email,
          data.password,
          data.phone
          )
      


      res.status(200).send({
        status:200,
        data:updatedStaf,
        msg:'updated'
      })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default updateOneStafByIdController