import jwt from "jsonwebtoken";
import config from "../config/config.js";

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @returns
 */
const verifyToken = (req, res, next) => {
  let token =
    req?.body?.token || req?.query?.token || req?.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
