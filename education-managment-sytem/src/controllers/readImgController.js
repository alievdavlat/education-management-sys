import path from 'path'
import ErrorHandler from '../utils/errorhandler.js';


const readImgController = ( req , res ) => {

try {
const { file } = req.params 
return res.sendFile(path.join(process.cwd(),  'uploads', file));

} catch (error) {
  new ErrorHandler(error.message, error.status)  
}

}

export default readImgController

