import multer from "multer";
import {  dirname } from "path";
import {fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// const views = multer.diskStorage({
//     destination: function(req,file,callback){
//         callback(null,__dirname +'/src/views')
//     },
//     filename: function(req,file,callback){
//         callback(null,file.originalname)
//     }
// });
export default  __dirname;