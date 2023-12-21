import ErrorHandler from "../../utils/errorhandler.js"
import { sign } from '../../utils/jwt.js';

const loginController = ( req , res ) => {
  try {
    
      const { userId , role , account} = req;
      const token = sign({ id: userId, role });
 
      res.status(200).send({
        status: 200,
        data: {
          token,
          role ,
          account
        },
        msg: "successfuly logged in ;)",
      });
  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }
}

export default loginController