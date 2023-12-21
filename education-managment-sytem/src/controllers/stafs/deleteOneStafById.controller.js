import ErrorHandler from "../../utils/errorhandler.js";
import { deleteOneStafById } from '../../middlewares/stafs/model.js'

const deleteOneStafByIdController = async (req, res) => {
  try {
    const { stafId } = req;
    const deletedStaf = await deleteOneStafById(stafId)

    res.status(200).send({
      status:200,
      data:deletedStaf,
      msg:'deleted'
    })



  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default deleteOneStafByIdController

