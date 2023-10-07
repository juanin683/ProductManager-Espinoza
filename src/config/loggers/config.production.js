import { createLogger,format,transports,addColors } from "winston"

const { simple,colorize } = format

const levels = {
  
    INFO: 3,
  
    
}

const colors = {
    INFO: 'green',

}

addColors(colors)

export default createLogger({
    levels,
    format: colorize(),
    transports: [
        new transports.File({
            level: "INFO",  
            format: simple(),
            filename:'./errors.log'
        }),
       
    ]
})
