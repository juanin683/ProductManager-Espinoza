// import config from "../config/loggers/factory.logger.js";

// export default (req, res, next) => {
//   req.logger = config;
//   req.logger.HTTP(
//     `${req.method} ${req.url} - ${new Date().toLocaleTimeString()}`
//   );
//   return next();
// };