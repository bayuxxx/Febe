const chatHandler = {
  // Get messages for a specific chat room
  getMessages: async (request, h) => {
    try {
      const { db } = request.server.app;
      const { chatId } = request.params;
      const { id: userId, role } = request.auth.credentials;

      // Verify user has access to this chat
      const chatRef = db.collection('chats').doc(chatId);
      const chatDoc = await chatRef.get();

      if (!chatDoc.exists) {
        return h.response({
          status: 'fail',
          message: 'Chat not found',
        }).code(404);
      }

      const chatData = chatDoc.data();
      
      // Check if user is participant in this chat
      if (!chatData.participants.includes(userId)) {
        return h.response({
          status: 'fail',
          message: 'Access denied',
        }).code(403);
      }

      // Get messages for this chat
      const messagesRef = db.collection('messages')
        .where('chatId', '==', chatId)
        .orderBy('createdAt', 'asc')
        .limit(50); // Limit last 50 messages

      const messagesSnapshot = await messagesRef.get();
      const messages = [];

      messagesSnapshot.forEach(doc => {
        messages.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return h.response({
        status: 'success',
        data: {
          chatId,
          messages
        }
      }).code(200);

    } catch (error) {
      console.error('Get messages error:', error);
      return h.response({
        status: 'error',
        message: 'Internal server error',
      }).code(500);
    }
  },

  // Send a message
  sendMessage: async (request, h) => {
    try {
      const { db, io } = request.server.app;
      const { chatId } = request.params;
      const { message } = request.payload;
      const { id: userId, role, name, email } = request.auth.credentials;

      // Verify chat exists and user has access
      const chatRef = db.collection('chats').doc(chatId);
      const chatDoc = await chatRef.get();

      if (!chatDoc.exists) {
        return h.response({
          status: 'fail',
          message: 'Chat not found',
        }).code(404);
      }

      const chatData = chatDoc.data();
      
      if (!chatData.participants.includes(userId)) {
        return h.response({
          status: 'fail',
          message: 'Access denied',
        }).code(403);
      }

      // Create message object
      const messageData = {
        chatId,
        senderId: userId,
        senderName: name,
        senderName : 'invalid',
        senderRole: role,
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };

      // Save message to database
      const messageRef = await db.collection('messages').add(messageData);

      // Prepare message for socket emission
      const socketMessage = {
        id: messageRef.id,
        ...messageData
      };

      // Emit to all users in the chat room
      io.to(`chat_${chatId}`).emit('newMessage', socketMessage);

      return h.response({
        status: 'success',
        message: 'Message sent successfully',
        data: socketMessage
      }).code(201);

    } catch (error) {
      console.error('Send message error:', error);
      return h.response({
        status: 'error',
        message: 'Internal server error',
      }).code(500);
    }
  },

  // Create a new chat between user and doctor
  createChat: async (request, h) => {
    try {
      const { db } = request.server.app;
      const { doctorId } = request.payload;
      const { id: userId, role } = request.auth.credentials;

      // Only users can create chats with doctors
      if (role !== 'user') {
        return h.response({
          status: 'fail',
          message: 'Only users can create chats with doctors',
        }).code(403);
      }

      // Verify doctor exists and is valid
      const doctorRef = db.collection('users').doc(doctorId);
      const doctorDoc = await doctorRef.get();

      if (!doctorDoc.exists) {
        return h.response({
          status: 'fail',
          message: 'Doctor not found',
        }).code(404);
      }

      const doctorData = doctorDoc.data();
      if (doctorData.role !== 'doctor' || !doctorData.isValid) {
        return h.response({
          status: 'fail',
          message: 'Invalid doctor',
        }).code(400);
      }

      // Check if chat already exists between these users
      const existingChatRef = db.collection('chats')
        .where('participants', 'array-contains', userId);
      
      const existingChatSnapshot = await existingChatRef.get();
      
      for (const doc of existingChatSnapshot.docs) {
        const chatData = doc.data();
        if (chatData.participants.includes(doctorId)) {
          return h.response({
            status: 'success',
            message: 'Chat already exists',
            data: {
              chatId: doc.id,
              ...chatData
            }
          }).code(200);
        }
      }

      // Create new chat
      const chatData = {
        participants: [userId, doctorId],
        createdAt: new Date().toISOString(),
        lastMessage: null,
        lastMessageAt: null
      };

      const chatRef = await db.collection('chats').add(chatData);

      return h.response({
        status: 'success',
        message: 'Chat created successfully',
        data: {
          chatId: chatRef.id,
          ...chatData
        }
      }).code(201);

    } catch (error) {
      console.error('Create chat error:', error);
      return h.response({
        status: 'error',
        message: 'Internal server error',
      }).code(500);
    }
  },

  // Get user's chats
  getUserChats: async (request, h) => {
    try {
      const { db } = request.server.app;
      const { id: userId } = request.auth.credentials;

      const chatsRef = db.collection('chats')
        .where('participants', 'array-contains', userId)
        .orderBy('lastMessageAt', 'desc');

      const chatsSnapshot = await chatsRef.get();
      const chats = [];

      for (const doc of chatsSnapshot.docs) {
        const chatData = doc.data();
        
        // Get other participant info
        const otherParticipantId = chatData.participants.find(id => id !== userId);
        const participantRef = db.collection('users').doc(otherParticipantId);
        const participantDoc = await participantRef.get();
        
        const participantData = participantDoc.data();
        const { password, ...participantInfo } = participantData;

        chats.push({
          id: doc.id,
          ...chatData,
          otherParticipant: {
            id: otherParticipantId,
            ...participantInfo
          }
        });
      }

      return h.response({
        status: 'success',
        data: { chats }
      }).code(200);

    } catch (error) {
      console.error('Get user chats error:', error);
      return h.response({
        status: 'error',
        message: 'Internal server error',
      }).code(500);
    }
  }
};

export default chatHandler;