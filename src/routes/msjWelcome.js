import express from "express";
import { Router } from "express";
import handlebars from "express-handlebars";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const msjWelcomeRouter = express();
const welcomeViewsRouter = Router();

msjWelcomeRouter.engine("handlebars", handlebars.engine());
msjWelcomeRouter.set("views", `${__dirname}/views`);
msjWelcomeRouter.set("view engine", "handlebars");

// *mwnaaje de bienvenida


export default welcomeViewsRouter;
