import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;
/**
 * Creates a logger instance with configurations specified in the application's config file.
 * Logs are outputted to the console.
 */

const myFormat = printf(({ timestamp, level,message }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [new transports.Console()]
})

export default logger;
