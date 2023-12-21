import { getAllAtentdance } from "../../middlewares/atentdane/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const getAtentdanceController = async (req , res) => {
  try {
      const { id } = req;

      const allAtentdance = await getAllAtentdance(id)

      res.status(200).send({
        status:200,
        data:allAtentdance,
        msg:'ok'
      })

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default  getAtentdanceController