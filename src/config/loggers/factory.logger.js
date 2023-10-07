import loggerDev from "../loggers/config.dev.js";
import loggerProd from "../loggers/config.production.js";

let env = process.env.ENV || "DEV";
let logger = null;

switch (env) {
  case "DEV":
    logger = loggerDev;
    break;
  case "TEST":
    logger = loggerDev;
    break;
  default: //"PROD"
    logger = loggerProd;
    break;
}

export default logger;