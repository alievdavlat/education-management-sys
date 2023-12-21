import { createAdmin } from "../../middlewares/admin/model.js"
import ErrorHandler from "../../utils/errorhandler.js"
import hashPassword from "../../utils/hashing.js"


const createAdminController = async( req , res ) => {
  try {
    let hashedPassword = ''

    const { data } = req

    res.status(201).send({
      status:201,
      data : {
        username: data.username,
        name:data.name,
        last_name:data.last_name,
        email: data.email,
        password: data.password,
        dob:data.dob,
        gender:data.gender == 1 ? 'male' : 'female',
        phone : data.phone,
        t_account:data.t_account,
        img:data.img
      },
      msg:'admin succesfully created' 
    })
    hashedPassword = await hashPassword(data.password)
    
    await createAdmin(
      data.username , data.name,
      data.last_name, data.email, 
      hashedPassword, data.dob,
      data.gender , data.phone,
      data.img, data.t_account 
    )


  } catch (error) {
    new ErrorHandler(error.message, error.status)
  }
}

export default createAdminController  