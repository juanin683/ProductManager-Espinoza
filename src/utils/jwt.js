import jwt from "jsonwebtoken"
import logger from "../config/loggers/factory.logger.js";
import config from "../../src/env.js"

export const secretToken = "SUPERSECRET"
export const authToken =(req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader)return res.status(401).render('login')
  const token=authHeader.split(' ')[1];
  jwt.verify(token,config.privateKey,(error,credentials)=>{
      if(error)return res.status(403).send({error:"no autorizado"})
      req.user=credentials.user;
  next();
  })
}

export const generateTokenWithExpire = (user) => {
  try {
      const expiresIn = 60 * 60 * 15 * 15;
      const token = jwt.sign({user}, config.privateKey, {expiresIn: expiresIn})
      return token;
  } catch (error) {
      logger.ERROR(error);
  }
};


export const generateToken = (object) =>
  jwt.sign(object, secretToken, { expiresIn: "1hr" });

export const JWTMW = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).send({ msg: "Sin autorizacion" });

  // Bearer TOKEN
  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, secretToken);
    req.user = user.user;
    next();
  } catch (e) {
    return res.status(403).send({ msg: "Sin autorizacion" });
  }
};

export const JWTCookieMW = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.send({ error: true });
  try {
    const valid = jwt.verify(token, secretToken);
    next();
  } catch (e) {
    return res.send({ error: true });
  }
};