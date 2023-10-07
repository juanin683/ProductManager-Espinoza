import { createLogger,format,transports,addColors } from "winston"

const { simple,colorize } = format

const levels = {
    DEBUG: 1,
    HTTP:2,
    INFO: 3,
    WARNING: 4,
    ERROR: 5,
    FATAL: 6,
}

const colors = {
    DEBUG: 'purple',
    HTTP:'blue',
    INFO: 'green',
    WARNING: 'yellow',
    ERROR: 'orange',
    FATAL: 'red',
}

addColors(colors)

export default createLogger({
    levels,
    format: colorize(),
    transports: [
        new transports.Console({
            level: "HTTP",  
            format: simple()
        }),
        
        new transports.Console({
            level: "DEBUG",
            format: simple(),
        
        })
    ]
})
