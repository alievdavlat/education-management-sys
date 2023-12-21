import ErrorHandler from "../../utils/errorhandler.js";
import hashPassword from "../../utils/hashing.js"
import { createNewStaf } from "../../middlewares/stafs/model.js";



const createStafController = async ( req , res ) => {
  try {
    const { data } = req;
    let hashedPassword = ''

    res.status(201).send({
      status:201,
      data : {
        username: data.username,
        name:data.name,
        last_name:data.last_name,
        email: data.email,
        password: data.password,
        gender:data.gender == 1 ? 'male' : data.gender == 2  ? 'female' :'noma`lum',
        dob:data.dob,
        phone : data.phone,
        proffesion:data.proffesion,
        fee:data.fee,
        role:data.role,
        t_account:data.t_account,
        img:`/img/${data.img}`,
        branch_id:data.branch_id,
        company_id:data.company_id
      },
      msg:'staf succesfully created' 
    })

    hashedPassword = await hashPassword(data.password)

    await createNewStaf(
      data.username,
      data.name,
      data.last_name,
      data.email,
      hashedPassword,
      data.dob,
      data.gender,
      data.proffesion,
      data.phone,
      data.fee,
      data.img,
      data.role,
      data.t_account,
      data.branch_id,
      data.company_id
    )

  } catch (err) {
    new ErrorHandler(err.message, err.status)
  }
}


export default createStafController