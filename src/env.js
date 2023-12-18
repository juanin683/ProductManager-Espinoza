import {Command} from "commander"
import dotenv from "dotenv"


const program = new Command();
const options = program.opts()

program.option('-p <port>', 'port to init app', 8080)
program.option('--mode <mode>','mode of execution','development')

program.parse();

dotenv.config();
export default {
    persistence: process.env.PERSISTENCE,
    LINK_DB: process.env.MONGO_URI,
    PORT: 8080,
    mailEcomerce: process.env.NODEMAILER_USER,
    mailPassEcommerce: process.env.NODEMAILER_PASSWORD,
    adminName: process.env.ADMIN_EMAIL,
    privateKey:process.env.PRIVATE_KEY,
    adminPassword: process.env.ADMIN_PASSWORD,
  };

  dotenv.config({
    path: options.mode=='production' ? './.env.production' :'./.env.development',
});