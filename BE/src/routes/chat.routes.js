import chatHandler from '../handlers/chat-handler.js';
import Joi from 'joi';

const chatRoutes = {
  name: 'chat-routes',
  version: '1.0.0',
  register: async (server, _options) => {
    server.route([
      {
        method: 'GET',
        path: '/api/chats',
        handler: chatHandler.getUserChats,
        options: {
          auth: 'jwt',
          description: 'Get user chats',
          tags: ['api', 'chat'],
        },
      },
      {
        method: 'POST',
        path: '/api/chats',
        handler: chatHandler.createChat,
        options: {
          auth: 'jwt',
          description: 'Create new chat with doctor',
          tags: ['api', 'chat'],
          validate: {
            payload: Joi.object({
              doctorId: Joi.string().required(),
            }),
          },
        },
      },
      {
        method: 'GET',
        path: '/api/chats/{chatId}/messages',
        handler: chatHandler.getMessages,
        options: {
          auth: 'jwt',
          description: 'Get messages for a chat',
          tags: ['api', 'chat'],
          validate: {
            params: Joi.object({
              chatId: Joi.string().required(),
            }),
          },
        },
      },
      {
        method: 'POST',
        path: '/api/chats/{chatId}/messages',
        handler: chatHandler.sendMessage,
        options: {
          auth: 'jwt',
          description: 'Send message to chat',
          tags: ['api', 'chat'],
          validate: {
            params: Joi.object({
              chatId: Joi.string().required(),
            }),
            payload: Joi.object({
              message: Joi.string().min(1).max(1000).required(),
            }),
          },
        },
      },
    ]);
  },
};

export default chatRoutes;