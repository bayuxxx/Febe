import authHandler from '../handlers/auth-handler.js';

export const authScheme = {
  authenticate: async (request, h) => {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return h.unauthenticated(new Error('Missing or invalid token format'));
    }

    const token = authorization.slice(7);
    const decoded = authHandler.verifyToken(token);

    if (!decoded) {
      return h.unauthenticated(new Error('Invalid or expired token'));
    }

    return h.authenticated({ credentials: decoded });
  },
};

export const hasRole = (roles) => {
  return (request, h) => {
    const { role } = request.auth.credentials;

    if (!roles.includes(role)) {
      return h
        .response({
          status: 'fail',
          message: 'Access forbidden. Insufficient permissions.',
        })
        .code(403)
        .takeover();
    }

    return h.continue;
  };
};
