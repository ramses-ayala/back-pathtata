import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Socket } from 'net';
import { Server } from 'http';
import { requestLogger } from './middlewares/request-logger';
import { routes } from './index.routes';
import { initDB } from './mikroOrmInit';
import { validateEnv, config } from './config';

export const app = express();


app.use(cors({ 
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/api', routes);

/**
 * Gracefully shuts down the server by closing all active connections and the server itself.
 * @param {Server} server - The HTTP server instance.
 * @param {Socket[]} connections - List of active connections to be closed.
 * @param {string} signal - The signal received that initiated the shutdown.
 */
export const shutdown = (server: Server, connections: Socket[], signal: string) => {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  // 1. Stop accepting new connections
  server.close((err) => {
    if (err) {
      console.error('Error closing server:', err);
      process.exit(1);
    }
    console.log('HTTP server closed.');
    // If we reach here, it means all connections were closed successfully/naturally
    process.exit(0);
  });

  // 2. Politely ask existing connections to finish
  console.log(`Ending ${connections.length} active connections...`);
  connections.forEach((socket) => socket.end());

  // 3. Force destroy connections after 10 seconds
  setTimeout(() => {
    console.warn('10s timeout: Destroying remaining connections...');
    connections.forEach((socket) => socket.destroy());
  }, 10000);

  // 4. Force exit process after 20 seconds if it's still hanging
  setTimeout(() => {
    console.error('20s timeout: Forcefully shutting down process...');
    process.exit(1);
  }, 20000);
};

/**
 * Initializes and starts the HTTP server, and sets up handling for system signals
 * for graceful shutdown.
 * @returns {Server} The HTTP server instance.
 */
export const bootstrap = async () => {
  // validate env vars
  validateEnv();
  try {
    await initDB();
    const server = app.listen(config.PORT, () => {
      console.log(`Server is started on port ${config.PORT}`);
    });

    // Track new connections to the server
    // Create the connections array to track sockets
    const connections: Socket[] = [];

    server.on('connection', (socket) => {
      connections.push(socket);
      socket.on('close', () => {
        const index = connections.indexOf(socket);
        if (index !== -1) {
          connections.splice(index, 1);
        }
      });
    });

    // Handle termination signals.
    process.on('SIGTERM', () => shutdown(server, connections, 'SIGTERM'));
    process.on('SIGINT', () => shutdown(server, connections, 'SIGINT'));

    return server;
  } catch (error) {
    console.error('Occured an error connecting to BD or initializing server: ', error);
    process.exit(1);
  }
};