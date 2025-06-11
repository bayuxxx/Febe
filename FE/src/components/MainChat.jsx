import {
  ChevronLeft,
  MessageCircle,
  Send,
  Stethoscope,
  User,
} from "lucide-react";
import { formatTime } from "../utils/FormatTime";
import React, { useState } from "react";

const MessageSkeleton = () => (
  <div className="space-y-4">
    {/* Left message skeleton */}
    <div className="flex justify-start">
      <div className="max-w-[75%] md:max-w-md bg-white rounded-lg p-4 shadow-sm animate-pulse">
        <div className="h-4 bg-green-100 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-green-100 rounded w-1/2"></div>
        <div className="h-3 bg-green-100 rounded w-20 mt-2"></div>
      </div>
    </div>

    {/* Right message skeleton */}
    <div className="flex justify-end">
      <div className="max-w-[75%] md:max-w-md bg-green-50 rounded-lg p-4 shadow-sm animate-pulse">
        <div className="h-4 bg-green-100 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-green-100 rounded w-1/2"></div>
        <div className="h-3 bg-green-100 rounded w-20 mt-2"></div>
      </div>
    </div>
  </div>
);

const MainChat = ({
  activeChat,
  selectChat,
  messages,
  isTyping,
  user,
  newMessage,
  setNewMessage,
  handleTyping,
  sendMessage,
  messagesEndRef,
  loading,
}) => {
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (isSending || !newMessage.trim()) return;

    const messageContent = newMessage.trim();
    setNewMessage(""); 

    try {
      setIsSending(true);
      await sendMessage(messageContent); 
    } catch (error) {
      console.error("Error sending message:", error);
      setNewMessage(messageContent);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isSending && newMessage.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className={`${!activeChat ? "hidden" : "flex"} md:flex flex-1 flex-col`}
    >
      {activeChat ? (
        <>
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => selectChat(null)}
                  className="md:hidden mr-2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  {activeChat.otherParticipant?.role ===
                  localStorage.getItem("role") ? (
                    <Stethoscope size={18} className="text-blue-600" />
                  ) : (
                    <User size={18} className="text-blue-600" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {activeChat.otherParticipant?.name || "Chat Room"}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">
                    {activeChat.otherParticipant?.role || "user"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {loading ? (
              <>
                <MessageSkeleton />
                <MessageSkeleton />
                <MessageSkeleton />
              </>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === localStorage.getItem("id")
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === localStorage.getItem("id")
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 shadow-sm"
                    }`}
                  >
                    <p className="text-sm break-words">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === localStorage.getItem("id")
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Typing Indicator */}
            {Object.entries(isTyping).some(
              ([userId, typing]) => typing && userId !== user?.id
            ) && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  handleTyping();
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isSending}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSending}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  </div>
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageCircle size={64} className="mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Select a chat
            </h2>
            <p className="text-gray-500">
              Choose a conversation to start messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainChat;
