import authHandler from '../handlers/auth-handler.js';
import Joi from 'joi';
import { authScheme, hasRole } from '../middleware/auth-scheme.js';

const authRoutes = {
  name: 'auth-routes',
  version: '1.0.0',
  register: async (server, _options) => {
    server.auth.scheme('jwt', () => authScheme);
    server.auth.strategy('jwt', 'jwt');

    server.route([
      {
        method: 'POST',
        path: '/api/auth/register',
        handler: authHandler.register,
        options: {
          auth: false,
          description: 'Register a new user',
          tags: ['api', 'auth'],
          validate: {
            payload: Joi.object({
              email: Joi.string().email().required(),
              password: Joi.string().min(6).required(),
              name: Joi.string().required(),
              role: Joi.string().valid('user', 'doctor', 'admin').default('user'),
              supportingUrl: Joi.string().uri().optional(),
              adminToken: Joi.string().optional(),
            }).custom((value, helpers) => {
              if (value.role === 'doctor' && !value.supportingUrl) {
                return helpers.error('any.custom', {
                  message: 'Supporting URL is required for doctor registration',
                });
              }
              if (value.role === 'admin' && !value.adminToken) {
                return helpers.error('any.custom', {
                  message: 'Admin token is required for admin registration',
                });
              }
              return value;
            }),
          },
        },
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        handler: authHandler.login,
        options: {
          auth: false,
          description: 'User login',
          tags: ['api', 'auth'],
          validate: {
            payload: Joi.object({
              email: Joi.string().email().required(),
              password: Joi.string().required(),
            }),
          },
        },
      },
      {
        method: 'GET',
        path: '/api/auth/me',
        handler: authHandler.me,
        options: {
          auth: 'jwt',
          description: 'Get current user information',
          tags: ['api', 'auth'],
        },
      },
      {
        method: 'PATCH',
        path: '/api/auth/doctors/status',
        handler: authHandler.changeDoctorStatus,
        options: {
          auth: 'jwt',
          pre: [hasRole(['admin'])],
          description: 'Change doctor validation status',
          tags: ['api', 'auth'],
          validate: {
            payload: Joi.object({
              doctorId: Joi.string().required(),
              isValid: Joi.boolean().required(),
            }),
          },
        },
      },
    ]);
  },
};

export default authRoutes;
