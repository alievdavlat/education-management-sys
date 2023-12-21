import ErrorHandler from "../../utils/errorhandler.js";
import { getAdmin, getStafs } from "../../utils/getUsers.js";
import { getAssistantlStafBYid, getPersonalStafBYid, getTeacherStafBYid } from "./model.js";


const getOneStafByIdMiddleware = async ( req, res , next ) => {
try {
  const { verifyId } = req;
  const { id } = req.params;
  const isAdmin = await getAdmin(verifyId);
  const isStaf = await getStafs(verifyId);


  if (isStaf) {
    res.status(401).send({
      status: 401,
      data: null,
      msg: "you cannot  acccess ",
    });
    return;
  }


  if (isAdmin.role == "eadmin" || isAdmin.role == "super_admin") {
    const foundedStafs = await getStafs(id);
    if (foundedStafs.role == 'personal') {
      const foundedStaf = await getPersonalStafBYid(id)
      req.foundedStaf = foundedStaf;
      next()
      return
    }

    if (foundedStafs.role == 'main-teacher') {
      const foundedStaf = await getTeacherStafBYid(id)
      req.foundedStaf = foundedStaf;
      next()
      return
    }

    if (foundedStafs.role == 'assistant') {
      const foundedStaf = await getAssistantlStafBYid(id)
      req.foundedStaf = foundedStaf;
      next()
      return
    }
  }

 
  res.status(401).send({
    status: 401,
    data: null,
    msg: "you cannot access ",
  });

  
} catch (err) {
  new ErrorHandler(err.message, err.status);
}
}


export default getOneStafByIdMiddleware
