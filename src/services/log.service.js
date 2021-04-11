const winston = require('winston');
const path = require('path');

const logDir = 'log';
const { format } = require('winston');

const { printf } = format;

const myFormat = printf(
  ({ level, message, label, timestamp }) => `${timestamp}: ${message}`
);
const log = winston.createLogger({
  name: 'vrockk-backend',
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, '/log_error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logDir, '/log_combined.log'),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, '/log_exceptions.log'),
    }),
  ],
});

if (process.env.ENV !== 'production') {
  log.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

module.exports = log;
