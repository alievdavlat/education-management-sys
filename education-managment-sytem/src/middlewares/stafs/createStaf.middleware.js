import { isAlreadyCreated } from './model.js'
import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";

const createStafMiddleware = async (req, res, next) => {
  try {
    const { verifyId } = req;

    const {
      username,
      name,
      last_name,
      email,
      password,
      dob,
      gender,
      proffesion,
      phone,
      fee,
      role,
      t_account,
      branch_id,
      company_id,
    } = req.body;

    const isAdmin = await getAdmin(verifyId);
    const isStaf = await getStafs(verifyId);

    if (isStaf) {
      res.status(401).send({
        status: 401,
        data: null,
        msg: "you cannot create stafs ",
      });
      return;
    }

    if (isAdmin.role != "eadmin") {
      res.status(401).send({
        status: 401,
        data: null,
        msg: "you cannot create stafs ",
      });
      return;
    }

    if (
      !username ||
      !name ||
      !last_name ||
      !email ||
      !password ||
      !dob ||
      !gender ||
      !proffesion ||
      !phone ||
      !fee ||
      !role ||
      !t_account ||
      !branch_id ||
      !company_id
    ) {
      res.status(204).send({
        status: 204,
        data: null,
        msg: "values required",
      });
      return;
    }

    const isALready = await isAlreadyCreated(username);

    if (isALready) {
      res.status(400).send({
        status: 400,
        data: null,
        msg: "staf already created",
      });
      return;
    }

    let data;

    if(req.file){
      const { filename } = req.file;
      data = {
        username,
        name,
        last_name,
        email,
        password,
        dob,
        gender,
        proffesion,
        phone,
        fee,
        img: filename,
        role,
        t_account,
        branch_id,
        company_id,
      };
  
    }
    
    if (!req.file) {
    data = {
        username,
        name,
        last_name,
        email,
        password,
        dob,
        gender,
        proffesion,
        phone,
        fee,
        role,
        t_account,
        branch_id,
        company_id,
      };
  
    }


    req.data = data;
    next();
  } catch (err) {
    new ErrorHandler(err.message, err.status);
  }
};

export default createStafMiddleware;
