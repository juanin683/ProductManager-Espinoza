import {Command} from "commander"
import dotenv from "dotenv"


const program = new Command();

program.option('-p <port>', 'port to init app', 8080)
program.option('--mode <mode>','mode of execution','development')

program.parse();

dotenv.config();
export default {
    persistence: process.env.PERSISTENCE,
    LINK_DB: process.env.MONGO_URI,
    PORT: process.env.PORT || 8080,
  
  };

  dotenv.config({
    path: options.mode=='production' ? './.env.production' :'./.env.development',
});
  