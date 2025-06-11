import React, { useState, useEffect, useRef } from "react";
import { Stethoscope } from "lucide-react";

import axios from "axios";
import { io } from "socket.io-client";
import ChatList from "../components/ChatList";
import currentUser from "../utils/CurrentUser";
import MainChat from "../components/MainChat";

const ChatApp = () => {
  const [user] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [isTyping, setIsTyping] = useState({});
  const [showDoctorList, setShowDoctorList] = useState(false);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const API_BASE = "https://api-capstone-production.up.railway.app/api";
  const token = localStorage.getItem("token");

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io("https://api-capstone-production.up.railway.app");

    // Authenticate socket
    socketRef.current.emit("authenticate", { token });

    // Listen for socket events
    socketRef.current.on("authenticated", (data) => {
      console.log("Socket authenticated:", data);
    });

    socketRef.current.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    socketRef.current.on("userTyping", (data) => {
      setIsTyping((prev) => ({
        ...prev,
        [data.userId]: data.isTyping,
      }));
    });

    socketRef.current.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch user chats
  const fetchChats = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/chats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (data.status === "success") {
        setChats(data.data.chats);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/doctors/valid`);
      if (data.status === "success") {
        setDoctors(data.data || []);
      }
      console.log("Doctors data:", data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  // Fetch messages for active chat
  const fetchMessages = async (chatId) => {
    setLoadings(true);
    setMessages([]);
    try {
      const { data } = await axios.get(`${API_BASE}/chats/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (data.status === "success") {
        setMessages(data.data.messages);
      } else {
        console.error("Failed to fetch messages:", data.message);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadings(false);
    }
  };

  // Create new chat with doctor
  const createChat = async (doctorId) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${API_BASE}/chats`,
        { doctorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === "success") {
        await fetchChats();
        setActiveChat(data.data);
        setShowDoctorList(false);
        socketRef.current.emit("joinChat", { chatId: data.data.chatId });
        await fetchMessages(data.data.chatId);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setLoading(false);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const response = await axios.post(
        `${API_BASE}/chats/${activeChat.id || activeChat.chatId}/messages`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle typing
  const handleTyping = () => {
    if (activeChat) {
      socketRef.current.emit("typing", {
        chatId: activeChat.id || activeChat.chatId,
      });

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit("stopTyping", {
          chatId: activeChat.id || activeChat.chatId,
        });
      }, 1000);
    }
  };

  // Select chat
  const selectChat = async (chat) => {
    setActiveChat(chat);
    setMessages([]);
    const chatId = chat.id || chat.chatId;
    socketRef.current.emit("joinChat", { chatId });
    await fetchMessages(chatId);
  };

  // Initialize data
  useEffect(() => {
    fetchChats();
    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-84px)] bg-gray-100">
      {/* Sidebar - Chat List */}
      <ChatList
        loading={loading}
        chats={chats}
        activeChat={activeChat}
        setShowDoctorList={setShowDoctorList}
        selectChat={selectChat}
        currentUser={currentUser}
      />

      {/* Main Chat Area */}
      <MainChat
        activeChat={activeChat}
        selectChat={selectChat}
        messages={messages}
        isTyping={isTyping}
        user={user}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleTyping={handleTyping}
        sendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
        loading={loadings}
      />

      {/* Doctor List Modal */}
      {showDoctorList && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Select a Doctor</h2>
              <button
                onClick={() => setShowDoctorList(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => createChat(doctor.id)}
                  className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Stethoscope size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-500">{doctor.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
