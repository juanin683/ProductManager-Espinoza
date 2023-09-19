import {Command} from "commander"
import dotenv from "dotenv"

const program = new Command();

program.option('-p <port>', 'port to init app', 8080)

program.parse();

dotenv.config();

export default {
    persistence: process.env.PERSISTENCE,
  };