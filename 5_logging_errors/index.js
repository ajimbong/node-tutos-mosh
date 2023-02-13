const winston = require('winston');
require('dotenv').config();

//creating our logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'user-service'},
    transports: [
        new winston.transports.File({filename: 'errors.log', level: 'error'})
    ]
})

if (process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

//Logging
logger.log({
    level: 'info',
    message: 'Hello distributed log files!'
});
  
logger.info('Hello again distributed logs');

logger.error('Failed to execute a terrible command')

