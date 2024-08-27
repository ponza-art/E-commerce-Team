import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import Joi from "joi";
dotenv.config();
const Token = async (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({
      state: "Error",
      message: "the auth is required",
      data: null,
      code: 401,
    });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 

    
    next();
  } catch (error) {
    res
      .status(401)
      .send({ state: "Error", message: error.message, data: null, code: 401 });
  }
};
export default Token
