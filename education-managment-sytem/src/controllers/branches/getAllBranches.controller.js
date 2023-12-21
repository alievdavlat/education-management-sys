import ErrorHandler from "../../utils/errorhandler.js";

const getAllBranchesController = async(req , res) => {
  try {
    const { allBranches } = req;
    res.status(200).send({
      status:200,
      data:allBranches,
      msg:'ok'
    })
  

  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}


export default getAllBranchesController
