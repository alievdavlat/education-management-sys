import ErrorHandler from "../../utils/errorhandler.js";

const getSelfCompanyController = (req, res) => {
  try {
    const { company } = req;
    
    res.status(200).send({
      status:200,
      data:company,
      msg:'ok'
    })
  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
}

export default getSelfCompanyController