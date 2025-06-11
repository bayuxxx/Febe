import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
const TOKEN_EXPIRY = '24h';

const authHandler = {
  register: async (request, h) => {
    try {
      const { db } = request.server.app;
      const payload = request.payload;

      if (payload.role === 'doctor' && !payload.supportingUrl) {
        return h
          .response({
            status: 'fail',
            message: 'Supporting URL is required for doctor registration',
          })
          .code(400);
      }

      if (payload.role === 'admin' && payload.adminToken !== ADMIN_TOKEN) {
        return h
          .response({
            status: 'fail',
            message: 'Invalid admin token',
          })
          .code(403);
      }

      const userRef = db.collection('users').where('email', '==', payload.email);
      const snapshot = await userRef.get();

      if (!snapshot.empty) {
        return h
          .response({
            status: 'fail',
            message: 'Email already registered',
          })
          .code(409);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      const userData = {
        email: payload.email,
        password: hashedPassword,
        name: payload.name,
        role: payload.role,
        createdAt: new Date().toISOString(),
      };

      if (payload.role === 'doctor' && payload.supportingUrl) {
        userData.supportingUrl = payload.supportingUrl;
      }

      if (payload.role === 'doctor') {
        userData.isValid = false;
      }

      const docRef = await db.collection('users').add(userData);

      const { password, ...userWithoutPassword } = userData;

      return h
        .response({
          status: 'success',
          message: 'User registered successfully',
          data: {
            id: docRef.id,
            ...userWithoutPassword,
          },
        })
        .code(201);
    } catch (error) {
      console.error('Register error:', error);
      return h
        .response({
          status: 'error',
          message: 'Internal server error',
        })
        .code(500);
    }
  },

  login: async (request, h) => {
    try {
      const { db } = request.server.app;
      const { email, password } = request.payload;

      const userRef = db.collection('users').where('email', '==', email);
      const snapshot = await userRef.get();

      if (snapshot.empty) {
        return h
          .response({
            status: 'fail',
            message: 'Invalid email or password',
          })
          .code(401);
      }

      const userData = snapshot.docs[0].data();
      const userId = snapshot.docs[0].id;

      const isValidPassword = await bcrypt.compare(password, userData.password);
      if (!isValidPassword) {
        return h
          .response({
            status: 'fail',
            message: 'Invalid email or password',
          })
          .code(401);
      }

      const token = jwt.sign(
        {
          id: userId,
          email: userData.email,
          role: userData.role,
        },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRY }
      );

      return h
        .response({
          status: 'success',
          message: 'Login successful',
          data: {
            id: userId,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            token,
          },
        })
        .code(200);
    } catch (error) {
      console.error('Login error:', error);
      return h
        .response({
          status: 'error',
          message: 'Internal server error',
        })
        .code(500);
    }
  },

  me: async (request, h) => {
    try {
      const { db } = request.server.app;
      const userId = request.auth.credentials.id;

      const userDoc = await db.collection('users').doc(userId).get();

      if (!userDoc.exists) {
        return h
          .response({
            status: 'fail',
            message: 'User not found',
          })
          .code(404);
      }

      const userData = userDoc.data();

      const { password, ...userWithoutPassword } = userData;

      return h
        .response({
          status: 'success',
          data: {
            id: userId,
            ...userWithoutPassword,
          },
        })
        .code(200);
    } catch (error) {
      console.error('Get current user error:', error);
      return h
        .response({
          status: 'error',
          message: 'Internal server error',
        })
        .code(500);
    }
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  },

  changeDoctorStatus: async (request, h) => {
    try {
      const { db } = request.server.app;
      const payload = request.payload;
      const adminRole = request.auth.credentials.role;

      if (adminRole !== 'admin') {
        return h
          .response({
            status: 'fail',
            message: 'Unauthorized. Only admins can change doctor status.',
          })
          .code(403);
      }

      const { doctorId, isValid } = payload;

      const doctorRef = db.collection('users').doc(doctorId);
      const doctorDoc = await doctorRef.get();

      if (!doctorDoc.exists) {
        return h
          .response({
            status: 'fail',
            message: 'Doctor not found',
          })
          .code(404);
      }

      const doctorData = doctorDoc.data();

      if (doctorData.role !== 'doctor') {
        return h
          .response({
            status: 'fail',
            message: 'User is not a doctor',
          })
          .code(400);
      }

      await doctorRef.update({ isValid });

      return h
        .response({
          status: 'success',
          message: `Doctor status updated successfully to ${isValid ? 'valid' : 'invalid'}`,
        })
        .code(200);
    } catch (error) {
      console.error('Change doctor status error:', error);
      return h
        .response({
          status: 'error',
          message: 'Internal server error',
        })
        .code(500);
    }
  },
};

export default authHandler;
