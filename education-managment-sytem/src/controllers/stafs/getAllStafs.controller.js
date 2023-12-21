import ErrorHandler from "../../utils/errorhandler.js";


const getAllStafsController = async (req, res) => {
  try {
    
    const {allStafs} = req; 
    res.status(200).send({
      status:200,
      data:allStafs,
      msg:'Ok'
    })

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}

export default getAllStafsController