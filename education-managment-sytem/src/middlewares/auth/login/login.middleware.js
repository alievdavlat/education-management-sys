import { getAdmin,  getStaf } from '../model.js';
import ErrorHandler from '../../../utils/errorhandler.js';
import bcrypt from 'bcrypt'

const loginMiddleware = async(req, res, next) => { 

try{
  
  const { username, password } = req.body
  const foundedAdmin = await getAdmin(username)
  const foundedstaf = await getStaf(username)
  

  
  if (username && password) {
      
      if (foundedAdmin) {
        const isValidPasswordAdmin = await bcrypt.compare(password, foundedAdmin.password);

            if (isValidPasswordAdmin) {  
            req.account = foundedAdmin          
            req.userId = foundedAdmin.id
            req.role = foundedAdmin.role
            next()
            return
            }
      }

 
      if (foundedstaf) {
       const isValidPasswordStaf = await bcrypt.compare(password, foundedstaf.password);
          if (isValidPasswordStaf) { 
          req.account = foundedstaf
          req.userId = foundedstaf.id
          req.role = foundedstaf.role
          next()
          return
          }
      }

      res.status(404).send({
        status: 404,
        data: null,
        msg: "user not found",
      });
      return
}
  
    res.status(400).send({
      status: 400,
      data: null,
      msg: "username or  password is wrong",
    });

    
  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }

}

export default loginMiddleware