import authHandler from '../handlers/auth-handler.js';

const setupChatSocket = (io, db) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle user authentication and joining chat rooms
    socket.on('authenticate', async (data) => {
      try {
        const { token } = data;
        const decoded = authHandler.verifyToken(token);
        
        if (!decoded) {
          socket.emit('authError', { message: 'Invalid token' });
          return;
        }

        socket.userId = decoded.id;
        socket.userRole = decoded.role;
        socket.userName = decoded.name || decoded.email;
        
        socket.emit('authenticated', { 
          userId: decoded.id, 
          role: decoded.role 
        });
        
        console.log(`User ${decoded.id} authenticated`);
      } catch (error) {
        console.error('Auth error:', error);
        socket.emit('authError', { message: 'Authentication failed' });
      }
    });

    // Join a chat room
    socket.on('joinChat', async (data) => {
      try {
        const { chatId } = data;
        
        if (!socket.userId) {
          socket.emit('error', { message: 'Not authenticated' });
          return;
        }

        // Verify user has access to this chat
        const chatRef = db.collection('chats').doc(chatId);
        const chatDoc = await chatRef.get();

        if (!chatDoc.exists) {
          socket.emit('error', { message: 'Chat not found' });
          return;
        }

        const chatData = chatDoc.data();
        if (!chatData.participants.includes(socket.userId)) {
          socket.emit('error', { message: 'Access denied' });
          return;
        }

        socket.join(`chat_${chatId}`);
        socket.currentChatId = chatId;
        
        socket.emit('joinedChat', { chatId });
        console.log(`User ${socket.userId} joined chat ${chatId}`);
        
      } catch (error) {
        console.error('Join chat error:', error);
        socket.emit('error', { message: 'Failed to join chat' });
      }
    });

    // Leave chat room
    socket.on('leaveChat', (data) => {
      const { chatId } = data;
      socket.leave(`chat_${chatId}`);
      socket.currentChatId = null;
      socket.emit('leftChat', { chatId });
      console.log(`User ${socket.userId} left chat ${chatId}`);
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
      const { chatId } = data;
      if (socket.currentChatId === chatId) {
        socket.to(`chat_${chatId}`).emit('userTyping', {
          userId: socket.userId,
          userName: socket.userName,
          isTyping: true
        });
      }
    });

    socket.on('stopTyping', (data) => {
      const { chatId } = data;
      if (socket.currentChatId === chatId) {
        socket.to(`chat_${chatId}`).emit('userTyping', {
          userId: socket.userId,
          userName: socket.userName,
          isTyping: false
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      if (socket.currentChatId) {
        socket.to(`chat_${socket.currentChatId}`).emit('userTyping', {
          userId: socket.userId,
          userName: socket.userName,
          isTyping: false
        });
      }
    });
  });
};

export default setupChatSocket;