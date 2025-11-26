import React, { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import {
  Bell,
  MessageSquare,
  Send,
  User,
  AlertCircle,
  ArrowRight,
  Search,
} from "lucide-react";

interface Notification {
  id: number;
  reportId: string;
  reportTitle: string;
  citizenName: string;
  type: "new_report" | "citizen_message" | "info";
  message?: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  reportId: string;
  reportTitle: string;
  citizenName: string;
  citizenEmail: string;
  lastMessage: string;
  lastMessageFrom: "citizen" | "municipality";
  timestamp: string;
  unreadCount: number;
  status: string;
}

interface ChatMessage {
  id: number;
  sender: "citizen" | "municipality";
  senderName: string;
  content: string;
  timestamp: string;
}

export const MunicipalityNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      reportId: "RPT-001",
      reportTitle: "Broken streetlight near Via Garibaldi",
      citizenName: "Mario Rossi",
      type: "new_report",
      timestamp: "2025-11-25 14:30",
      read: false,
    },
    {
      id: 2,
      reportId: "RPT-002",
      reportTitle: "Overflowing trash bin",
      citizenName: "Laura Bianchi",
      type: "citizen_message",
      message: "When will this be addressed? It's been 3 days.",
      timestamp: "2025-11-25 10:15",
      read: false,
    },
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      reportId: "RPT-002",
      reportTitle: "Overflowing trash bin",
      citizenName: "Laura Bianchi",
      citizenEmail: "laura.bianchi@email.com",
      lastMessage: "When will this be addressed? It's been 3 days.",
      lastMessageFrom: "citizen",
      timestamp: "2025-11-25 10:15",
      unreadCount: 1,
      status: "ASSIGNED",
    },
    {
      reportId: "RPT-001",
      reportTitle: "Broken streetlight near Via Garibaldi",
      citizenName: "Mario Rossi",
      citizenEmail: "mario.rossi@email.com",
      lastMessage: "We are scheduling the intervention for next Monday.",
      lastMessageFrom: "municipality",
      timestamp: "2025-11-24 16:45",
      unreadCount: 0,
      status: "IN_PROGRESS",
    },
  ]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"notifications" | "messages">(
    "notifications"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const totalUnreadMessages = conversations.reduce(
    (sum, c) => sum + c.unreadCount,
    0
  );

  const markAsRead = (notificationId: number) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const openConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Mark as read
    setConversations(
      conversations.map((c) =>
        c.reportId === conversation.reportId ? { ...c, unreadCount: 0 } : c
      )
    );
    // Load chat messages for this conversation
    // TODO: Fetch from API
    setChatMessages([
      {
        id: 1,
        sender: "citizen",
        senderName: conversation.citizenName,
        content: "Hello, I'd like to report this issue.",
        timestamp: "2025-11-24 14:00",
      },
      {
        id: 2,
        sender: "municipality",
        senderName: "Technical Office",
        content:
          "Thank you for reporting. We have assigned this to our team.",
        timestamp: "2025-11-24 15:30",
      },
      {
        id: 3,
        sender: "citizen",
        senderName: conversation.citizenName,
        content: "When will this be addressed? It's been 3 days.",
        timestamp: "2025-11-25 10:15",
      },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "municipality",
        senderName: "You",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
      // TODO: Send to API
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "ASSIGNED":
        return "bg-green-100 text-green-800 border-green-300";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "RESOLVED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.reportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reportTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            💬 Citizen Communications
          </h1>
          <p className="text-base text-slate-600">
            Manage notifications and communicate with citizens about their
            reports
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b-2 border-slate-200">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("notifications")}
              className={`relative px-6 py-3 text-sm font-bold transition-all ${
                activeTab === "notifications"
                  ? "text-indigo-700 border-b-3 border-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-2 rounded-full text-xs font-bold bg-red-500 text-white">
                    {unreadNotifications}
                  </span>
                )}
              </span>
              {activeTab === "notifications" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`relative px-6 py-3 text-sm font-bold transition-all ${
                activeTab === "messages"
                  ? "text-indigo-700 border-b-3 border-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
                {totalUnreadMessages > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-2 rounded-full text-xs font-bold bg-red-500 text-white">
                    {totalUnreadMessages}
                  </span>
                )}
              </span>
              {activeTab === "messages" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-12 text-center">
                <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-semibold text-slate-600">
                  No notifications yet
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  You'll receive updates about new reports and citizen messages
                </p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => markAsRead(notification.id)}
                  className={`rounded-2xl border-2 bg-gradient-to-br overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    notification.read
                      ? "border-slate-200 from-white to-slate-50/30 opacity-75"
                      : "border-indigo-200 from-white to-indigo-50/30 shadow-md"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl shadow-md flex-shrink-0 ${
                          notification.type === "new_report"
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                            : "bg-gradient-to-br from-purple-500 to-pink-600 text-white"
                        }`}
                      >
                        {notification.type === "new_report" ? (
                          <AlertCircle className="h-6 w-6" />
                        ) : (
                          <MessageSquare className="h-6 w-6" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                              {notification.type === "new_report"
                                ? "New Report"
                                : "Citizen Message"}
                            </p>
                            <h3 className="text-base font-bold text-slate-900 mt-1">
                              {notification.reportTitle}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                              Report {notification.reportId} • By{" "}
                              {notification.citizenName}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 mt-1"></div>
                          )}
                        </div>

                        {notification.message && (
                          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mt-3">
                            <p className="text-sm font-semibold text-purple-900 mb-1">
                              Message from {notification.citizenName}
                            </p>
                            <p className="text-sm text-purple-800">
                              {notification.message}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4">
                          <p className="text-xs text-slate-500">
                            {notification.timestamp}
                          </p>
                          {notification.type === "citizen_message" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const conv = conversations.find(
                                  (c) => c.reportId === notification.reportId
                                );
                                if (conv) {
                                  setActiveTab("messages");
                                  openConversation(conv);
                                }
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
                            >
                              Reply
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                />
              </div>

              <div className="space-y-2">
                {filteredConversations.map((conversation, index) => (
                  <motion.div
                    key={conversation.reportId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => openConversation(conversation)}
                    className={`rounded-xl border-2 p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedConversation?.reportId === conversation.reportId
                        ? "border-indigo-500 bg-indigo-50"
                        : conversation.unreadCount > 0
                        ? "border-purple-300 bg-purple-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">
                            {conversation.reportId}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="inline-flex items-center justify-center min-w-[18px] h-4 px-1.5 rounded-full text-xs font-bold bg-red-500 text-white">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 truncate mt-1">
                          {conversation.reportTitle}
                        </h4>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-md border font-semibold ${getStatusColor(
                          conversation.status
                        )}`}
                      >
                        {conversation.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-slate-400" />
                      <p className="text-xs font-semibold text-slate-700">
                        {conversation.citizenName}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                      {conversation.lastMessageFrom === "citizen" ? "👤 " : "🏛️ "}
                      {conversation.lastMessage}
                    </p>

                    <p className="text-xs text-slate-500">
                      {conversation.timestamp}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              {selectedConversation ? (
                <div className="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden flex flex-col h-[600px]">
                  {/* Chat Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-bold uppercase tracking-wide opacity-90">
                          {selectedConversation.reportId}
                        </p>
                        <h3 className="text-lg font-bold mt-1">
                          {selectedConversation.reportTitle}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <User className="h-4 w-4" />
                          <p className="text-sm">
                            {selectedConversation.citizenName} •{" "}
                            {selectedConversation.citizenEmail}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1.5 rounded-lg border-2 font-bold ${getStatusColor(
                          selectedConversation.status
                        )}`}
                      >
                        {selectedConversation.status}
                      </span>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
                    {chatMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex ${
                          message.sender === "municipality"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] ${
                            message.sender === "municipality"
                              ? "bg-indigo-600 text-white"
                              : "bg-white border-2 border-slate-200 text-slate-900"
                          } rounded-2xl px-4 py-3 shadow-sm`}
                        >
                          <p className="text-xs font-bold opacity-75 mb-1">
                            {message.senderName}
                          </p>
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                          <p
                            className={`text-xs mt-2 ${
                              message.sender === "municipality"
                                ? "opacity-75"
                                : "text-slate-500"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 bg-white border-t-2 border-slate-200">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors shadow-md"
                      >
                        <Send className="h-4 w-4" />
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-slate-200 bg-white p-12 text-center h-[600px] flex flex-col items-center justify-center">
                  <MessageSquare className="h-20 w-20 text-slate-300 mb-4" />
                  <p className="text-lg font-semibold text-slate-600">
                    Select a conversation
                  </p>
                  <p className="text-sm text-slate-500 mt-2">
                    Choose a conversation from the list to start messaging with
                    citizens
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MunicipalityNotificationsPage;
