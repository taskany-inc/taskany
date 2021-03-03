import winston from 'winston';

const transports = [];

if (process.env.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.simple(), winston.format.colorize()),
            level: 'verbose',
        }),
    );
}

if (process.env.TASKANY_LOG_FILE) {
    transports.push(new winston.transports.File({ filename: 'combined.log' }));
}

if (process.env.TASKANY_ERRORS_LOG_FILE) {
    transports.push(new winston.transports.File({ filename: 'error.log', level: 'error' }));
}

export const log = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports,
});
