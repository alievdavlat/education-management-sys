import jwt from "jsonwebtoken";

 const accesTokenMiddleware = (req, res, next) => {
  const { token } = req.headers;

  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).send({
        status: 403,
        data: null,
        msg: "autentifikatsion token yaroqsiz",
      });
    }


    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({
        status: 401,
        data: null,
        msg: "autentifikatsion token mavjud emas",
      });
    }
    req.verifyId = decode.id;
    next();
  });
};

export default accesTokenMiddleware