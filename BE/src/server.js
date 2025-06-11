import Hapi from '@hapi/hapi';
import admin from 'firebase-admin';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Server } from 'socket.io';

//import routes
import authRoutes from './routes/auth.routes.js';
import chatRoutes from './routes/chat.routes.js';
import doctorRoutes from './routes/doctor.routes.js';

//import socket setup
import setupChatSocket from './socket/chat-socket.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const serviceAccountPath = join(__dirname, 'firebase.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Authorization', 'Content-Type'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
    },
  });

  const io = new Server(server.listener, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Set database instance
  server.app.io = io;
  server.app.db = db;

  // Setup socket handlers
  setupChatSocket(io, db);

  server.route({
    method: 'GET',
    path: '/',
    handler: (_request, h) => {
      return h
        .response({
          status: 'success',
          message: '🚀 API is running successfully!',
        })
        .code(200);
    },
  });

  await server.register(authRoutes);
  await server.register(chatRoutes);
  await server.register(doctorRoutes);

  await server.start();
  console.log(`🚀 Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

init();