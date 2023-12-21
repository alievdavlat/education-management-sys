import { branchesEmployees } from "../../middlewares/stafs/model.js";
import ErrorHandler from "../../utils/errorhandler.js";


const branchesEmployeesController = async ( req , res ) => {
  try {
    const { branchId, column, offset , limit  } = req;

    const brancheEmployees = await branchesEmployees(branchId, column, offset, limit)
    res.status(200).send({
      status:200,
      data: brancheEmployees,
      msg:'ok'
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default  branchesEmployeesController