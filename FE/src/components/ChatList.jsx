import { MessageCircle, Stethoscope, User } from "lucide-react";
import { formatTime } from "../utils/FormatTime";

const ChatList = ({
  loading,
  chats,
  activeChat,
  setShowDoctorList,
  selectChat,
  currentUser,
}) => {
  return (
    <div
      className={`${
        activeChat ? "hidden" : "flex"
      } md:flex w-full md:w-1/3 bg-white border-r border-gray-200 flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-blue-600 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle size={24} />
            Health Chat
          </h1>
          {currentUser?.role !== "doctor" && (
            <button
              onClick={() => setShowDoctorList(true)}
              className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded-lg text-sm transition-colors"
            >
              New Chat
            </button>
          )}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-12 animate-pulse" />
                </div>
              </div>
            ))}
          </>
        ) : chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
            <p>No chats yet</p>
            <p className="text-sm">Start a conversation with a doctor</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat?.id === chat.id
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {chat.otherParticipant?.role === "doctor" ? (
                    <Stethoscope size={20} className="text-blue-600" />
                  ) : (
                    <User size={20} className="text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {chat.otherParticipant?.name || "Unknown User"}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {chat.otherParticipant?.role || "user"}
                  </p>
                  {chat.lastMessage && (
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  )}
                </div>
                {chat.lastMessageAt && (
                  <span className="text-xs text-gray-400">
                    {formatTime(chat.lastMessageAt)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
