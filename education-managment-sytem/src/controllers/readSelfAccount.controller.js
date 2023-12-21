import ErrorHandler from "../utils/errorhandler.js";

const readSelfAccountController = (req, res) => {
  try {
    const { account } = req;
    res.status(200).send({
      status: 200,
      data: account,
      msg: "OK",
    });
  } catch (err) {
    new ErrorHandler((err.message, err.status));
  }
};
export default readSelfAccountController;
