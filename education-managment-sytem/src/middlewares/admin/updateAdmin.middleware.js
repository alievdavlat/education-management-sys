import { getAdmin } from "../../utils/getUsers.js";



const updateAdminMiddleware = async(req, res, next) => {
try {
  const { verifyId } = req;
  const { id } = req.params;
  const { username,name, last_name , email, password, phone ,t_account} = req.body;
  

  const isAdmin = await getAdmin(verifyId)

  

  if (!username || !name || !last_name || !email || !password ||  !phone  || !t_account  ) {
    res.status(204).send({
      status:204,
      data:null,
      msg : 'values is required'
    })
    return 
  }


  if (isAdmin && isAdmin.role == 'super_admin') {
    const body = {username,name, last_name , email, password, phone ,t_account}
    req.adminId = id;
    req.newBody = body;
    next()
    return
  }

  if (isAdmin && isAdmin.role == 'eadmin'  && isAdmin.id == id) {  
    const body = {username,name, last_name , email, password, phone ,t_account}
    req.adminId = id;
    req.newBody = body;
    next()
    return
  }
  

  res.status(401).send({
    status:401,
    data:null,
    msg : 'you cannot update admin '
  })
 
} catch (err) {
  new ErrorHandler(err.message, err.status)
}
}


export default updateAdminMiddleware