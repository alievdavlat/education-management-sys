import { getOneGroup } from "../../middlewares/groups/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getOneGroupController = async ( req , res ) => {
  try {
    const { id } = req;
    const foundedGroup = await getOneGroup(id)

    res.status(200).send({
      status:200,
      data:foundedGroup,
      msg:'ok'
    })


  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default  getOneGroupController