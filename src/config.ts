import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'test';
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });

/**
 * Configuration object containing the necessary environment variables for the application.
 * Provides defaults for each variable if not specified in the environment.
 */
export const config = {
    PORT: parseInt(process.env.PORT || '8000', 10),
    NODE_ENV: process.env.NODE_ENV || 'test',
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
    },
    SECRET_KEY: process.env.SECRET_KEY,
};

/**
 * Validates the presence of required environment variables.
 * @throws {Error} If a required environment variable is missing.
 */
export const validateEnv = () => {
    const requiredEnvVars = [
        'PORT',
        'NODE_ENV',
        'LOG_LEVEL',
        'DB_USER',
        'DB_PASSWORD',
        'DB_NAME',
        'DB_HOST',
        'DB_PORT',
        'SECRET_KEY'
    ];

    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
          throw new Error(`Config validation error: missing ${envVar}.`);
        }
    })
};
